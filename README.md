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

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/MooRagab/Online-Food-Order.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Postman Documentation

Explore the API endpoints and examples using the [Online Food Order API Postman Documentation](./Online-Food-Order.postman_collection.json).

## Usage

To interact with the API, follow these steps:

1. Download the [Online Food Order API Postman Collection](./Online-Food-Order.postman_collection.json).
2. Import the collection into your Postman app.
   
![image](https://github.com/MooRagab/Online-Food-Order/assets/79729746/69afc7af-714d-4800-b6e5-c0d13637d1b3)
   


##  Customer Operations

![image](https://github.com/MooRagab/Online-Food-Order/assets/79729746/5bfe449a-a59a-4588-94bd-95a1a0fc5a09)

### 1. Sign Up - Customer

**Endpoint:** `POST /customer/signup`

**Description:** Create a new customer account.

**Usage:**
To sign up as a customer, make a POST request to the specified endpoint with the required information in the request body.
- **Request Body:**
  ```json
  {
   "email": "your_email@example.com",
   "password": "YourPassword123",
   "cPassword": "YourPassword123",
   "firstName": "YourFirstName",
   "lastName": "YourLastName",
   "phone": "YourPhoneNumber"
  }
### 2. Log In - Customer

**Endpoint:** `POST /customer/login`

**Description:** Log in as a customer.

**Usage:**
To log in, make a POST request to the specified endpoint with your email and password in the request body.
- **Request Body:**
  ```json
  {
   "email": "your_email@example.com",
   "password": "YourPassword123",
  }

### 3. Profile - Customer

**Endpoint:** `GET /customer/profile`

**Description:** Retrieve the profile information of the logged-in customer.

**Usage:**
To get the customer profile, make a GET request to the specified endpoint with the authorization header containing the JWT obtained after successful login.

### 4. Edit Profile - Customer

**Endpoint:** `PATCH /customer/editprofile`

**Description:** Edit the profile information of the logged-in customer.

**Usage:**
To edit the customer profile, make a PATCH request to the specified endpoint with the authorization header containing the JWT obtained after successful login. Include the updated profile information in the request body.
(You must insert password to confirm your self)
- **Request Body:**
  ```json
  {
   "password": "YourPassword123",
   "firstName": "YourNewFirstName",
   "lastName": "YourNewLastName",
   "address": "YourNewAddress"
  }
### 5. Create Order

**Endpoint:** `POST /customer/createorder`

**Description:** Create a new order as a customer.

**Usage:**
To create an order, make a POST request to the specified endpoint with the authorization header containing the JWT obtained after successful login. Include the order details in the request body.
- **Request Body:**
  ```json
  {
    "amount": ,
  "items": [
    {
      "_id": "orderId",
      "unit": 2
    },
    {
      "_id": "orderId",
      "unit": 
    }
  ]
  }

### 6. Get Orders

**Endpoint:** `GET /customer/orders`

**Description:** Retrieve a list of orders placed by the logged-in customer.

**Usage:**
To get the list of orders, make a GET request to the specified endpoint with the authorization header containing the JWT obtained after successful login.

### 7. Get Order By ID

**Endpoint:** `GET /customer/order/{orderId}`

**Description:** Retrieve details of a specific order by its ID.

**Usage:**
To get details of a specific order, replace {orderId} with the actual order ID and make a GET request to the specified endpoint with the authorization header containing the JWT obtained after successful login.

### 8. Add to Cart

**Endpoint:** `POST /customer/cart`

**Description:** Add items to the customer's shopping cart.

**Usage:**
To add items to the cart, make a POST request to the specified endpoint with the authorization header containing the JWT obtained after successful login. Include the item details in the request body.
- **Request Body:**
  ```json
  {
      "_id": "orderId",
      "unit": 
  }

### 9. Delete Cart

**Endpoint:** `DELETE /customer/cart`

**Description:** Clear the items in the customer's shopping cart.

**Usage:**
To clear the cart, make a DELETE request to the specified endpoint with the authorization header containing the JWT obtained after successful login.

### 10. Get Cart

**Endpoint:** `GET /customer/cart`

**Description:** Retrieve the items in the customer's shopping cart.

**Usage:**
To get the cart items, make a GET request to the specified endpoint with the authorization header containing the JWT obtained after successful login.

### 11. Verify Offers

**Endpoint:** `GET /customer/offer/verify/{offerId}`

**Description:** Verify a promotional offer as a customer.

**Usage:**
To verify an offer, replace {offerId} with the actual offer ID and make a GET request to the specified endpoint with the authorization header containing the JWT obtained after successful login.

### 12. Create Payment

**Endpoint:** `POST /customer/create-payment`

**Description:** Create a payment for an order as a customer.

**Usage:**
To create a payment, make a POST request to the specified endpoint with the authorization header containing the JWT obtained after successful login. Include the payment details in the request body.
- **Request Body:**
  ```json
  {
      "offerId": "orderId",
      "amount":  ,
      "paymentMod":""
  }
  
## Admin Operations

![image](https://github.com/MooRagab/Online-Food-Order/assets/79729746/c5f1b56c-b2f8-4f20-84a3-10ec98130e4b)

The Admin collection in the Postman documentation provides convenient API requests to manage vendors and transactions within the Online Food Order system.

### 1. Create Vendor 

- **Endpoint:** `POST /admin/vendor`
- **Description:** Create a new vendor in the system.
- **Request Body:**
  ```json
  {
    "name": "",
    "foodType": "",
    "ownerName": "",
    "password": "",
    "cPassword": "",
    "email": "",
    "pincode": "",
    "phone": ""
  }
 - **Usage:**
This request creates a new vendor with the specified details.

### 2. Get Vendor By ID

- **Endpoint:** `GET /admin/vendor/65a64290315cb4090793aa59`
- **Description:** Retrieve information about a specific vendor using their ID.
- **Usage:**
  - Replace `65a64290315cb4090793aa59` in the endpoint with the actual vendor ID to get detailed information.

### 3. Get All Vendors

- **Endpoint:** `GET /admin/vendors`
- **Description:** Retrieve a list of all vendors in the system.
- **Usage:**
  - This request fetches information about all registered vendors.

### 4. Get Transaction By ID

- **Endpoint:** `GET /admin/transaction/65a8fbe50c0e6d9713c263f2`
- **Description:** Retrieve details about a specific transaction using its ID.
- **Usage:**
  - Replace `65a8fbe50c0e6d9713c263f2` in the endpoint with the actual transaction ID to get detailed information.

### 5. Get All Transactions

- **Endpoint:** `GET /admin/transactions`
- **Description:** Retrieve a list of all transactions in the system.
- **Usage:**
  - This request provides information about all recorded transactions.

## Vendor Operations

![image](https://github.com/MooRagab/Online-Food-Order/assets/79729746/0dedba3e-a4cb-4318-be0e-cded52d6788f)

### 1. Vendor Login

- **Endpoint:** `POST /vendor/login`
- **Description:** Authenticate and log in as a vendor.
- **Request Body:**
  ```json
  {
    "email": "",
    "password": ""
  }
- **Usage:**
  - This request logs in the vendor using the provided email and password.
    
### 2. Vendor Profile

- **Endpoint:** `GET /vendor/vendorProfile`
- **Description:** Retrieve the profile information of the logged-in vendor.
- **Usage:**
  - Ensure the request includes the `authorization` header with the JWT obtained after successful login.

### 3. Get Current Order

- **Endpoint:** `GET /vendor/vendorProfile`
- **Description:** Retrieve details about the current order of the logged-in vendor.
- **Usage:**
  - Ensure the request includes the `authorization` header with the JWT obtained after successful login.

### 4. Get Order Details

- **Endpoint:** `GET /vendor/order/65a78e1ac3eb4ff1d25300ff`
- **Description:** Retrieve detailed information about a specific order.
- **Usage:**
  - Replace `65a78e1ac3eb4ff1d25300ff` with the actual order ID to get specific details.
  - Ensure the request includes the `authorization` header with the JWT obtained after successful login.

### 5. Order Process

- **Endpoint:** `PUT /vendor/order/65a78e1ac3eb4ff1d25300ff`
- **Description:** Update the status of a specific order (e.g., mark as "Done").
- **Request Body:**
  ```json
  {
    "status": "Done"
  }
- **Usage:**
  - Replace `65a78e1ac3eb4ff1d25300ff` with the actual order ID to update the order status.
  - Ensure the request includes the `authorization` header with the JWT obtained after successful login.

### 6. Vendor Update Profile

- **Endpoint:** `PATCH /vendor/updatevendorprofile`
- **Description:** Update the profile information of the logged-in vendor.
- **Request Body:**
  ```json
  {
    "name": "",
    "foodType": ""
  }
 - **Usage:**
   - Ensure the request includes the `authorization` header with the JWT obtained after successful login..

    ### 7. Vendor Service Available

- **Endpoint:** `PATCH /vendor/service`
- **Description:** Toggle the availability status of the vendor's service.
- **Usage:** Ensure the request includes the `authorization` header with the JWT obtained after successful login.

### 8. Profile Pic

- **Endpoint:** `POST /vendor/profilepic`
- **Description:** Upload a profile picture for the logged-in vendor.
- **Request Body:**
  - Form Data:
    - Key: `image`, Type: `file`, Source: [Path to the Image File]
- **Usage:**
  - Replace `[Path to the Image File]` with the actual path to the image file on your local machine.
  - Ensure the request includes the `authorization` header with the JWT obtained after successful login.

### 9. Add Offer

- **Endpoint:** `POST /vendor/offer`
- **Description:** Add a new promotional offer for the vendor.
- **Request Body:**
  ```json
  {
    "title": "",
    "description": "",
    "offerType": "",
    "offerAmount": ,
    "pincode": "",
    "promoCode": "",
    "startValidity": "",
    "endValidity": "",
    "isActive": "",
    "minvalue": ""
  }
 - **Usage:** This request adds a new promotional offer for the vendor. 

### 10. Get Offers

- **Endpoint:** `GET /vendor/offers`
- **Description:** Retrieve a list of all offers for the logged-in vendor.
- **Usage:** Ensure the request includes the `authorization` header with the JWT obtained after successful login.

### 11. Edit Offer

- **Endpoint:** `PUT /vendor/offer/65a8dfaff45ba40285ea1a94`
- **Description:** Edit the details of a specific offer for the vendor.
- **Request Body:**
  ```json
  {
    "offerType": "",
    "title": "",
    "description": "",
    "offerAmount": ,
    "startValidity": ,
    "endValidity": ,
    "pincode": "",
    "isActive": 
  }
 - **Usage:**
   - Replace `65a8dfaff45ba40285ea1a94` with the actual offer ID to update offer details.
   - Ensure the request includes the `authorization` header with the JWT obtained after successful login.

 ##  Food Operations
 
![image](https://github.com/MooRagab/Online-Food-Order/assets/79729746/1396acaf-3ebf-465c-878c-8c0b66fd4e7e)

### 1. Add Food

**Endpoint:** `POST /food/addFood`

**Description:** Add a new food item.

- **Request Body:**
  ```json
  {
  "name": "",
  "description": "",
  "foodType": ""
  }
 - **Usage:**
   - Ensure the request includes the `authorization` header with the JWT obtained after successful login.


### 2. Get Food

**Endpoint:** `POST /food/getFood`

**Description:** Retrieve a list of all available food items.

 - **Usage:**
   - Make a GET request to the specified endpoint.
  
##  Shopping Operations

![image](https://github.com/MooRagab/Online-Food-Order/assets/79729746/e6f21022-5738-4508-9f46-c58d109fc4b0)

### 1. Food Availability

**Endpoint:** `GET /shopping/foodAvailability`

**Description:** Check the availability of food items.

**Usage:** Make a GET request to the specified endpoint.

### 2. Top Restaurant

**Endpoint:** `GET /shopping/topRestaurant/:pincode`

**Description:** Retrieve information about the top restaurant in a specific pincode.
**Usage:** Ensure the request includes the `authorization` header with the JWT obtained after successful login.

### 3. Food in 30 Minutes

**Endpoint:** `GET /shopping/foodsIn30Min/:pincode`

**Description:** Retrieve food items available for delivery in 30 minutes within a specific pincode.

**Usage:**
To retrieve food items available for delivery in 30 minutes, make a GET request to the specified endpoint.

### 4. Search Food

**Endpoint:** `GET /shopping/searchFoods/:pincode`

**Description:** Search for food items available within a specific pincode.

**Usage:**
To search for food items, make a GET request to the specified endpoint.

### 5. Restaurant by ID

**Endpoint:** `GET /shopping/restaurant/65a25e618a9d93074466a360`

**Description:** Retrieve detailed information about a specific restaurant using its unique ID.

**Usage:**
To get details of a specific restaurant, make a GET request to the specified endpoint.

### 6. Get Offers

**Endpoint:** `GET /shopping/offers/:pincode`

**Description:** Retrieve a list of available offers within a specific pincode.

**Usage:**
To get a list of offers, make a GET request to the specified endpoint.

  
##  Delivery Operations

![image](https://github.com/MooRagab/Online-Food-Order/assets/79729746/da56a291-563f-4d80-a7e1-fb9554e7eb03)

### 1. Delivery Sign Up
**Endpoint:** `POST /delivery/signup`

**Description:** Register as a delivery person.

**Usage:**
To sign up, make a POST request to the specified endpoint with the following raw JSON body:
- **Request Body:**
  ```json
  {
   "email": "your_email@example.com",
   "password": "YourPassword123",
   "cPassword": "YourPassword123",
   "firstName": "YourFirstName",
   "lastName": "YourLastName",
   "phone": "YourPhoneNumber"
   "pincode":"YourPincode"
   "address":"YourAddress"
  }
  
### 2. Delivery Log In
**Endpoint:** `POST /delivery/login`

**Description:** Log in as a delivery person.

**Usage:**
To log in, make a POST request to the specified endpoint with the following raw JSON body:
- **Request Body:**
  ```json
  {
   "email": "your_email@example.com",
   "password": "YourPassword123",
  }

### 3. Delivery Profile
**Endpoint:** `GET /delivery/profile`

**Description:** Retrieve the profile information of the logged-in delivery person.

**Usage:**
To get the delivery person's profile, make a GET request to the specified endpoint with the authorization header containing the JWT obtained after successful login.


### 4. Delivery Edit Profile
**Endpoint:** `PATCH /delivery/profile`

**Description:** Edit the profile information of the logged-in delivery person.

**Usage:**
To edit the delivery person's profile, make a PATCH request to the specified endpoint with the authorization header containing the JWT obtained after successful login. Include the updated profile information in the raw JSON body:
- **Request Body:**
  ```json
  {
   "password": "YourPassword123",
   "firstName": "YourNewFirstName",
   "lastName": "YourNewLastName",
   "address": "YourNewAddress"
  }
  
### 5. Delivery Status
**Endpoint:** `PATCH /delivery/change-status`

**Description:** Update the delivery person's status.

**Usage:**
To update the status, make a PATCH request to the specified endpoint with the authorization header containing the JWT obtained after successful login. Include the latitude and longitude in the raw JSON body:
- **Request Body:**
  ```json
  {
   "lat": "Your latitude"  ,
   "lng": "Your longitude" 
  }


## Contact

For inquiries, please contact me at rmidoragab222@gmail.com.
