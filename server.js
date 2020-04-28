const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

let palyer = [];
// Run when client connects
io.on("connection", (socket) => {
  palyer.push(socket);

  // Welcome current user
  socket.emit("message", "Welcome to Test Game");

  // Broadcast when a user connects
  socket.broadcast.emit("message", "A user has joned the game");

  // Run when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the game");
  });
  if (palyer[1]) {
    palyer[0].emit("message", "Esti jucatorul Nr. 1");
    palyer[1].emit("message", "Esti jucatorul Nr. 2");
  }
  // Listen for gameMessage
  socket.on("gameMessage", (msg) => {
    io.emit("message", msg);
  });
});
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
