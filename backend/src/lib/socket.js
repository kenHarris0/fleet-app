import http from "http";
import { Server } from "socket.io";
import socketProxy from "../middlewares/socketMiddleware.js";
import User from "../models/user.model.js";
import Group from "../models/Groups.model.js";

export default function setupSocket(app) {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://fleet-app-3.onrender.com"
      ],
      credentials: true,
    },
  });

  io.use(socketProxy);

  let socketMap = {};

  io.on("connection", async (socket) => {
    console.log("SOCKET CONNECTED:", socket.user.name);

    socketMap[socket.userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(socketMap));

    // Auto join groups
    const groups = await Group.find({ members: socket.userId });
    groups.forEach((g) => socket.join(g._id.toString()));

    socket.on("JoinGroup", (groupId) => socket.join(groupId));
    socket.on("LeaveGroup", (groupId) => socket.leave(groupId));

    socket.on("disconnect", () => {
      delete socketMap[socket.userId];
      io.emit("getOnlineUsers", Object.keys(socketMap));
    });
  });

  return { server, io };
}
