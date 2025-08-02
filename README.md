
# Skilswap : Skill Sharing Platform

SkillSwap is a MERN-based web application that connects people who want to learn new skills with others willing to share their expertise. Users can list their skills, browse skills offered by others, send requests, and chat in real time — all in a seamless, modern platform.

### 🛠️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Real-time:** Socket.IO
- **Validation:** Joi
- **Authentication:** JWT, bcrypt
- **Hosting (optional):**  Vercel, Render



## 📦 Installation & Setup

1️⃣ **Clone the repository**

```bash  
  git clone https://github.com/Sachinyadav00/skillswap.git
  cd skillswap

```
2️⃣ **Install dependencies**

```bash
Install for both frontend and backend:

cd backend
npm install

cd frontend
npm install
```
3️⃣ **Configure environment variables**

- Create .env files in both /backend and /frontend directories.
Include the following keys (example):

```bash
# In /backend/.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

# In /frontend/.env
VITE_API_URL=http://localhost:3000
```


4️⃣ **Start the application**
```bash
✅ Start the backend server

cd backend
npm start       #for node
npm run dev     #for hot reload nodemon
```
```bash
✅ Start the frontend client

cd ../frontend
npm start     
npm run dev     #for hot reload nodemon
```


5️⃣ **Open the app**
- Visit these in your browser:
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:3000
