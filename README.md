# Online Food Order API

## Overview

The "Online Food Order API" is a Node.js, Express, and TypeScript project aimed at optimizing the food ordering experience. This project represents a significant milestone as my first venture into TypeScript, coupled with the implementation of a novel architecture for enhanced scalability and maintainability.

## Dependencies

- **bcrypt:** Library for hashing passwords securely.
- **cloudinary:** Cloud storage service for handling images and media files.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing in Express.
- **dotenv:** Library for loading environment variables from a `.env` file.
- **express:** Web framework for building APIs and web applications.
- **joi:** Schema validation library for validating requests.
- **jsonwebtoken:** Library for generating and verifying JSON Web Tokens (JWT).
- **mongoose:** MongoDB object modeling for Node.js.
- **multer:** Middleware for handling multipart/form-data, typically used for file uploads.
- **nodemailer:** Library for sending emails.
- **nodemon:** Utility for monitoring changes in your source code and restarting the server automatically.
- **ts-node:** TypeScript execution and REPL for Node.js.
- **ts-node-dev:** Development server with automatic TypeScript compilation and hot-reloading.
- **typescript:** Typed superset of JavaScript that compiles to plain JavaScript.

## Project Structure

![image](https://github.com/MooRagab/Online-Food-Order/assets/79729746/663ba054-65ee-400f-9dd7-631ce93e91b4)

The project follows a structured organization within the `src` directory:

- **controllers:** Contains controllers that handle the logic for each route.
- **DB:** Manages database connection and schema models using Mongoose.
- **config:** Holds configuration files, such as environment-specific settings.
- **middlewares:** Centralized location for middleware functions.
- **routes:** Defines the application routes and their respective controllers.
- **services:** Houses business logic and functionality separate from controllers.
- **validation:** Includes validation schemas using the Joi library.
- **dto:** Data Transfer Objects for defining the types and structures of data used in the application.
- **index.ts:** The main entry point of the application.

## Postman Documentation

Explore the API endpoints and examples using the [Online Food Order API Postman Documentation](./postman-docs.json).

## Usage

To interact with the API, follow these steps:

1. Download the [Online Food Order API Postman Collection](./postman-docs.json).
2. Import the collection into your Postman app.

### Admin Operations

The Admin collection in the Postman documentation provides convenient API requests to manage vendors and transactions within the Online Food Order system.

#### 1. Create Vendor

- **Endpoint:** `POST /admin/vendor`
- **Description:** Create a new vendor in the system.
- **Request Body:**
  ```json
  {
    "name": "Third Rest",
    "foodType": "Chicken",
    "ownerName": "Ahmed Ragab",
    "password": "Mohamed8809",
    "cPassword": "Mohamed8809",
    "email": "rmidogab28422@gmail.com",
    "pincode": "8809",
    "phone": "01892459193"
  }
