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

Explore the API endpoints and examples using the [Online Food Order API Postman Documentation](./Online-Food-Order.postman_collection.json).

## Usage

### Retrieve User Information

To retrieve information about a user, make a `GET` request to the following endpoint:

```bash
curl -X GET https://your-api-domain/users/{user_id}
