const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Make io accessible in controllers
app.set("io", io);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins their personal room based on their user ID
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Only bind a port in local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel Serverless (Note: WebSockets won't work on Vercel)
module.exports = server;