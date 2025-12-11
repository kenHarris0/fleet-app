import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./lib/db.js";

// Routes
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import chatRouter from "./routes/chat.routes.js";
import groupRouter from "./routes/group.routes.js";
import gpmsgRouter from "./routes/grpmsg.routes.js";

// Socket setup function
import setupSocket from "./lib/socket.js";

const app = express();
const __dirname = path.resolve();

// ✅ CORS (works in dev + production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://fleet-app-3.onrender.com" // your frontend URL
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());

// API routes
app.use("/user", userRouter);
app.use("/msg", messageRouter);
app.use("/chat", chatRouter);
app.use("/grp", groupRouter);
app.use("/grpmsg", gpmsgRouter);

// Serve frontend (only production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Attach socket.io and start server
const { server } = setupSocket(app);

server.listen(5000, () => {
  connectDB();
  console.log("SERVER RUNNING");
});
