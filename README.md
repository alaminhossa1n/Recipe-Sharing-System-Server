# Recipe Sharing System - Server

Welcome to the server-side repository for the Recipe Sharing System.

## Overview

This is the backend for the Recipe Sharing System, a platform where users can share, browse, and purchase recipes. Built using Express.js and MongoDB, the server handles user authentication, recipe management, and coin transactions. Firebase Authentication is used for user login, and Stripe is used for handling payments.

## Live Server

Access the live server: [Recipe Sharing System Server](https://recipe-sharing-system-server.vercel.app/)

## Repository

Access the codebase and contribute to the project: [GitHub Repository](https://github.com/alaminhossa1n/Recipe-Sharing-System-Server)

## Features

- **User Authentication**: Google Authentication via Firebase.
- **Recipe Management**: Create, read, update, and delete recipes.
- **Coin Management**: Handle coin transactions for viewing recipes and purchasing additional coins.
- **Payment Handling**: Use Stripe for processing payments.
- **JWT Authentication**: Secure API endpoints using JWT.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/alaminhossa1n/Recipe-Sharing-System-Server.git
   ```

2. Install dependencies:

   ```bash
   cd Recipe-Sharing-System-Server
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Build the TypeScript files:

   ```bash
   npm run build
   ```

5. Start the development server:

   ```bash
   npm run start:dev
   ```

## Scripts

- **Start Development Server**:

  ```bash
  npm run start:dev
  ```

## API Endpoints

### Authentication

- **Register/Login User**

  ```http
  POST /api/user/create-user
  ```

- **Get Single User**

  ```http
  GET /api/user/get-single-user
  ```

- **Update User Coins**

  ```http
  PATCH /api/user/update-coin
  ```

### Recipes

- **Create Recipe**

  ```http
  POST /api/recipe/create-recipe
  ```

- **Get All Recipes**

  ```http
  GET /api/recipe/all-recipe
  ```

- **Get Recipe By ID**

  ```http
  GET /api/recipe/single-recipe/:id
  ```

- **Update Recipe**

  ```http
  PATCH /api/recipe/update/:id
  ```

### Payments

- **Buy Coins**

  ```http
  POST /api/payment
  ```

## Technologies Used

- Express.js
- MongoDB
- Mongoose
- Firebase Authentication
- Stripe
- JSON Web Tokens (JWT)
- TypeScript

## Contributor

- [Al-Amin Hossain](https://www.linkedin.com/in/alaminhossa1n/)
  - LinkedIn: [Al-Amin Hossain](https://www.linkedin.com/in/alaminhossa1n/)
  - GitHub: [alaminhossa1n](https://github.com/alaminhossa1n)

Feel free to contribute and improve the Recipe Sharing System!

---

Happy cooking! 🍲