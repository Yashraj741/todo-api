# 📝 MERN Todo App

A full-stack Todo Application built using the **MERN Stack** with secure authentication, session timeout, password change functionality, and a clean responsive UI.

---

# ✨ Features

✅ User Authentication (Login/Register)  
✅ JWT Authentication  
✅ Session Timeout Auto Logout ⏳  
✅ Change Password 🔐  
✅ Create / Edit / Delete Todos 📝  
✅ Responsive UI 🎨  
✅ Typewriter Welcome Animation ⌨️  
✅ Session Storage Authentication  
✅ Loading & Error Handling ⚡  

---

# 🛠️ Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- MongoDB
- JWT
- bcryptjs

---

# 📂 Folder Structure

```bash
project-root/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation Guide

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

---

# 2️⃣ Open Project Folder

```bash
cd your-repo-name
```

---

# 🔥 Backend Setup

## 📦 Move to Backend Folder

```bash
cd backend
```

---

## 📥 Install Backend Dependencies

```bash
npm install
```

OR manually install:

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
```

Install nodemon:

```bash
npm install -D nodemon
```

---

# 📝 Create .env File

Create a `.env` file inside backend folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# ▶️ Run Backend Server

```bash
npm run dev
```

✅ Backend running on:

```bash
http://localhost:3000
```

---

# 🎨 Frontend Setup

## 📦 Open New Terminal

Move to frontend folder:

```bash
cd frontend
```

---

## 📥 Install Frontend Dependencies

```bash
npm install
```

OR manually install:

```bash
npm install react react-dom axios
```

Install Vite:

```bash
npm install -D vite
```

Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
```

---

# ▶️ Run Frontend

```bash
npm run dev
```

✅ Frontend running on:

```bash
http://localhost:5173
```

---

# 🔐 Authentication Flow

- User Registers/Login
- JWT Token Generated
- Token stored in `sessionStorage`
- Auto Logout after 10 minutes ⏳
- Session Timer shown in footer
- Manual Sign Out supported

---

# 🧠 Beginner Friendly Commands

## Start Backend

```bash
cd backend
npm run dev
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# 📦 Backend Dependencies

```json
{
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.6.1"
}
```

---

# 📦 Frontend Dependencies

```json
{
  "axios": "^1.6.7",
  "react": "^19.2.5",
  "react-dom": "^19.2.5"
}
```

---

# 🧪 Future Improvements

🚀 Dark Mode  
🚀 Todo Categories  
🚀 Drag & Drop Todos  
🚀 Email Verification  
🚀 Deploy on Render/Vercel  

---

# 👨‍💻 Author

Made with ❤️ by Yashraj

---

# ⭐ Support

If you like this project:

⭐ Star the repository  
🍴 Fork the repository  
🛠️ Contribute to the project  

---

# 📜 License

This project is open-source and available under the ISC License.

Feel free to use, modify, and distribute it.