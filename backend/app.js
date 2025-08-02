const express = require("express");
const authRouter = require("./routes/authRoutes");
const skillRouter = require("./routes/skillRoutes");
const requestRouter = require("./routes/requestRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", authRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/requests", requestRouter);

module.exports = app;
