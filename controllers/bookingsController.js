import db from "../db.js";

export const bookSeat = async (req, res) => {
    const { userId, source, destination } = req.body;
    try {
        const train = await db.query('SELECT * FROM trains WHERE source = $1 AND destination = $2 AND seats > 0', [source, destination]);
        const result = await db.query('UPDATE trains SET seats = seats - 1 WHERE id = $1 AND seats > 0 RETURNING *', [train.rows[0].id]);
        if (result.rows.length === 0) {
            return res.json({ success: false, message: 'Booking failed - No seats left' });
        }

        await db.query('INSERT INTO bookings (user_id, train_id,Train_Name) VALUES ($1, $2,$3)', [userId, result.rows[0].id,result.rows[0].train_name]);
        res.json({sucess: true, message: 'Booking confirmed',Train_Name:result.rows[0].train_name });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

export const getBookingDetails = async (req, res) => {
    const { userId } = req.body;
    try {
        const result = await db.query('SELECT * FROM bookings WHERE user_id = $1', [userId]);
        if (result.rows.length === 0){
            return res.json({ success: false, message: 'Booking history empty' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};
