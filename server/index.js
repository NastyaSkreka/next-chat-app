const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});

const users = [];

io.on("connection", (socket) => {
    console.log("User Connected" , socket.id)

  /*  socket.on("sign-up", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} name ${data}`)
    }) */

    socket.on("send_message", (data) => {
        console.log("inside send_message");
        io.emit("receive_message", data);
    });

    socket.on("getConnectedUsers", () => {
        io.emit('connectedUsers', users);
        console.log("Sending Online Users");
    });


    socket.on("newUser", (data) => {
        users.push(data);
        io.emit("responseNewUser", users);
      });
  

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})

server.listen(3001, () => {
    console.log("SERVER RUNNING")
});