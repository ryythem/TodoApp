# TodoApp
TodoApp is an application that lets you signup, signin, and manage your daily todos seamlessly. Users can add, modify, and delete their todos with secure authentication.

## Features
- User authentication (signup/signin)
- Create, read, update, and delete todos
- Secure authentication using JWT
- Validation with Zod
- Password hashing with Bcrypt

## Technologies used
- MERN Stack (MongoDB, Express.js, React, Node.js)
- Zod for data validation
- Bcrypt for password hashing
- JWT for secure user authentication

## Installation
### 1. Clone the repositiry
```
git clone <repo-url>
cd TodoApp
```
### 2. Backend Setup
- Go to backend folder
```
cd backend
```

- Install backend dependencies
```
npm install
```

- Create a .env file in the backend directory and add your MongoDB URI and JWT secret:
```
MONGO_URL='your-mongodb-uri'
JWT_SECRET='your-jwt-secret'
```

- Start the backend server:
```
npx nodemon index.js
```

- The backend will be running on PORT 7777. Use **Postman** for api calls