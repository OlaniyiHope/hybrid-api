import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "../routes/auth.js";
import usersRoute from "../routes/users.js";
import propertiesRoute from "../routes/properties.js";
import roomsRoute from "../routes/rooms.js";
import cookieParser from "cookie-parser";
import createProxyMiddleware from "http-proxy-middleware";
import cors from "cors"; // Import the cors middleware

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB has disconnected!");
});

// Middlewares
app.use(cors()); // Enable CORS
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/properties", propertiesRoute);
app.use("/api/rooms", roomsRoute);

// Define a proxy route
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://hybridapi-b5a8919346f7.herokuapp.com",
    changeOrigin: true,
  })
);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log("Connected to the backend.");
});
