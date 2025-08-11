const express = require("express");
const authRouter = require("./routes/authRoutes");
const skillRouter = require("./routes/skillRoutes");
const requestRouter = require("./routes/requestRoutes");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow your React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies/auth headers
  })
);

app.use("/api/v1/users", authRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/requests", requestRouter);

module.exports = app;
