# Fullstack Todo App

This repository contains a fullstack Todo application with a Node.js/Express backend and a React frontend. The backend uses MongoDB for data storage.

## Project Structure

```
Backend/      # Node.js/Express backend
Frontend/     # React frontend (Vite + Tailwind CSS)
```

## Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or Atlas)

---

## Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the Backend directory with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
   - Replace `your_mongodb_connection_string` with your MongoDB URI (local or Atlas).
   - Replace `your_jwt_secret` with a strong secret key.
4. Start the backend server:
   ```sh
   npm run dev
   ```
   - The server will run on `http://localhost:5000` by default.

---

## Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
   - The app will run on `http://localhost:5173` by default (Vite default port).

---

## MongoDB Setup

- **Local MongoDB:**
  1. Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community).
  2. Start the MongoDB server (usually with `mongod`).
  3. Use the connection string: `mongodb://localhost:27017/tododb`

- **MongoDB Atlas (Cloud):**
  1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
  2. Create a database user and get your connection string.
  3. Replace the `MONGO_URI` in your `.env` file with this string.

---

## Available Scripts

### Backend
- `npm run dev` — Start backend in development mode (with nodemon)
- `npm start` — Start backend in production mode

### Frontend
- `npm run dev` — Start frontend in development mode
- `npm run build` — Build frontend for production

---

## Features
- User authentication (register/login)
- Create, read, update, delete todos
- Protected routes (JWT)
- Responsive UI with React and Tailwind CSS

---

## Troubleshooting
- Ensure MongoDB is running and accessible.
- Check `.env` variables for typos.
- If ports are in use, change the `PORT` in `.env` or Vite config.

---

## License
MIT
