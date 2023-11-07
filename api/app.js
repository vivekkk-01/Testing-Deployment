const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const doctorRoutes = require("./routes/doctor");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res
    .status(err.errorCode || 500)
    .json({ message: err.message || "An unknown error occurred!" });
  next(err);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection established...");
  })
  .catch((err) => {
    console.log(err, "Error occurred...");
  });

app.listen(process.env.PORT, () => {
  console.log("Backend server is running...");
});
