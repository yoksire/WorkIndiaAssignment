# Railway Booking API

This project implements a REST API for a simplified railway booking system. It allows users to register, log in, book train tickets, and view their booking details. It also provides endpoints for administrators to add trains.

## Project Structure

The project is organized into the following directories:

*   **`controllers/`**: Contains the logic for handling API requests (e.g., user registration, train booking).
*   **`middleware/`**: Contains middleware functions, such as authentication.
*   **`routes/`**: Defines the API endpoints and connects them to the corresponding controller functions.
*   **`db.js`**:  Handles the database connection (PostgreSQL).
*   **`server.js`**: The main entry point for the Express application.
*   **`package.json`**: Defines project dependencies and scripts.
*   **`package-lock.json`**:  Locks dependency versions.
*   **`.env`**: (Not committed to the repository) Stores environment variables, such as database credentials.
*    **`docker-compose.yml`**: configuration for running the project.

## Technologies Used

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **PostgreSQL:** Relational database.
*   **pg:** PostgreSQL client for Node.js.
*   **dotenv:** Loads environment variables from a `.env` file.
*   **cors:** Enables Cross-Origin Resource Sharing.
*   **Docker:** Containerization platform (for running PostgreSQL).

## API Endpoints

The API provides the following endpoints:

### User Endpoints (`/api/user`)

| Method | Endpoint        | Description                                   | Authentication |
| ------ | --------------- | --------------------------------------------- | -------------- |
| POST   | `/api/user/register` | Registers a new user.                      | None           |
| POST   | `/api/user/login`    | Logs in an existing user.                     | None           |
| POST   | `/api/user/admin`   | Logs in an administrator.                    | None           |

### Train Endpoints (`/api/train`)

| Method | Endpoint       | Description                      | Authentication   |
| ------ | -------------- | -------------------------------- | ---------------- |
| POST   | `/api/train/add` | Adds a new train (admin only).     | Admin Required |
| POST   | `/api/train/get` | Retrieves a list of all trains. | None           |

### Booking Endpoints (`/api/booking`)

| Method | Endpoint          | Description                              | Authentication |
| ------ | ----------------- | ---------------------------------------- | -------------- |
| POST   | `/api/booking/book` | Books a seat on a train.                 | User Required  |
| POST   | `/api/booking/get`  | Retrieves booking details for a user.    | User Required  |

## Setup and Installation

1.  **Prerequisites:**

    *   Node.js (v16 or later recommended)
    *   npm (or Yarn)
    *   Docker (and Docker Compose)

2.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Create a `.env` file:**

    Create a `.env` file in the root directory of the project and add the following environment variables, replacing the placeholder values with your actual credentials:

    ```dotenv
    PG_USER=your_postgres_user
    PG_HOST=db  # Use 'db' for Docker Compose, 'localhost' if running PostgreSQL directly
    PG_DATABASE=your_database_name
    PG_PASSWORD=your_postgres_password
    PG_PORT=5432
    JWT_SECRET=your_jwt_secret # A strong, random secret for JWT
    ADMIN_USERNAME=your_admin_username # For admin login
    ADMIN_PASSWORD=your_admin_password # For admin login
    ```

    **Important:**  Do *not* commit the `.env` file to your repository. It contains sensitive information.

5.  **Run PostgreSQL using Docker Compose:**

    ```bash
    docker-compose up -d
    ```
    This will start the PostgreSQL database in a Docker container.

6.  **Start the Node.js server:**

    ```bash
    npm start
    ```
    or
     ```bash
    node server.js
    ```
    The server will run on port 3000 by default.

7. **Stop the server and docker (when you are finished)**
    ```bash
      docker-compose down
    ```
## Running without Docker (Alternative Setup)

If you prefer not to use Docker, you can install PostgreSQL directly on your system.

1.  **Install PostgreSQL:** Follow the instructions for your operating system to install PostgreSQL.

2.  **Create a Database:** Create a new database and user with the credentials you specified in your `.env` file.  You can use the `psql` command-line tool or a GUI client like pgAdmin.

3.  **Update `.env`:**  In your `.env` file, change `PG_HOST` to `localhost`.

4. **Run the server**: Run server using the `npm start` command, or the `node server.js` command.

## Testing

You can test the API endpoints using tools like Postman, Insomnia, or `curl`.

## Example Requests (using `curl`)

**Register a User:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}' http://localhost:3000/api/user/register
