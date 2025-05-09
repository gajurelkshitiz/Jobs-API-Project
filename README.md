# Jobs API

## Overview
The Jobs API project is a Node.js and Express.js application that allows users to manage job postings. It includes features for user authentication, job creation, updating, and deletion. The project is built with a focus on security, scalability, and best practices in API development.

## Features

### Authentication
- **Register User**: Validates user input (name, email, password), hashes passwords using `bcryptjs`, and generates a JWT token.
- **Login User**: Validates credentials, checks password correctness, and generates a JWT token upon successful login.

### Job Management
- **Create Job**: Allows authenticated users to create job postings.
- **Update Job**: Enables users to update their job postings.
- **Delete Job**: Allows users to delete their job postings.
- **Get All Jobs**: Fetches all jobs created by the authenticated user.
- **Get Single Job**: Retrieves details of a specific job by ID.

### Security
- Implements security best practices using the following packages:
  - `helmet`: Sets HTTP headers for security.
  - `cors`: Enables Cross-Origin Resource Sharing.
  - `xss-clean`: Prevents cross-site scripting attacks.
  - `express-rate-limit`: Limits repeated requests to public APIs.

### Error Handling
- Handles Mongoose validation errors, duplicate email errors, and cast errors.
- Custom error classes for better error management.

### Database
- Uses MongoDB as the database.
- Mongoose is used for schema modeling and database interaction.

## Setup

### Prerequisites
- Node.js (>= 18.0.0)
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Jobs\ API
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   MONGO_URI=<your-mongo-uri>
   JWT_SECRET=<your-jwt-secret>
   JWT_LIFETIME=30d
   ```
5. Start the application:
   ```bash
   npm start
   ```

## Project Structure
```
Jobs API/
├── app.js                # Entry point of the application
├── controllers/          # Contains route logic
│   ├── auth.js           # Authentication logic
│   └── jobs.js           # Job management logic
├── db/                   # Database connection
│   └── connect.js
├── errors/               # Custom error classes
├── middleware/           # Middleware for authentication and error handling
├── models/               # Mongoose schemas
│   ├── jobs.js           # Job schema
│   └── user.js           # User schema
├── routes/               # API routes
│   ├── auth.js           # Authentication routes
│   └── jobs.js           # Job routes
├── public/               # Public assets
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## API Endpoints

### Authentication
- **POST** `/api/v1/auth/register`: Register a new user.
- **POST** `/api/v1/auth/login`: Login an existing user.

### Jobs
- **GET** `/api/v1/jobs`: Get all jobs for the authenticated user.
- **POST** `/api/v1/jobs`: Create a new job.
- **GET** `/api/v1/jobs/:id`: Get a specific job by ID.
- **PATCH** `/api/v1/jobs/:id`: Update a job by ID.
- **DELETE** `/api/v1/jobs/:id`: Delete a job by ID.

## Concepts Covered

### Controllers and Routes Setup
- Organized route logic into separate controller files for better maintainability.

### Database Connection
- Used Mongoose to connect to MongoDB and manage schemas.

### Schema Models
- Defined schemas for `User` and `Job` with validation and pre-save hooks.

### Authentication
- Implemented JWT-based authentication.
- Used middleware to protect routes.

### Error Handling
- Created custom error classes for better error management.
- Handled Mongoose-specific errors like validation and duplicate key errors.

### Security
- Added security layers using `helmet`, `cors`, `xss-clean`, and `express-rate-limit`.

## Additional Notes
- Use Postman or a similar tool to test the API endpoints.
- Ensure the `.env` file is correctly configured before starting the application.

## References
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express.js Documentation](https://expressjs.com/)