const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require('uuid');
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});

const users = [];
const groups = []; 


io.on("connection", (socket) => {
    console.log("User Connected" , socket.id)

    socket.on("send_message", (data) => {
        console.log("inside send_message");
        io.emit("receive_message", data);
    });

    socket.on("getConnectedUsers", () => {
        socket.emit('connectedUsers', users);
        console.log("Sending Online Users");
    });

    socket.on("newUser", (username) => {
        const isFound = users.find((user) => username === user.user);
        const newUserData = { user: username, socketId: socket.id };

        if(isFound) {
            users.map((user) => user.user === newUserData.user ? newUserData : user);
            return io.emit("responseNewUser", users);
        }

        users.push(newUserData);
        console.log(users);
        io.emit("responseNewUser", users);
      });
  
      socket.on('createGroup', (newGroup) => {
        newGroup.id = generateUniqueId();
      
        groups.push(newGroup);
      
        console.log('inside createGroup');
        console.log(newGroup);

        socket.emit('newGroup', newGroup, error => {
            console.log(error);
        });
      
      
        newGroup.members.forEach((member) => {
            const userSocketId = users.find((user) => user.user === member.user).socketId;
            if(!userSocketId) return;

            socket.to(userSocketId).emit('newGroup', newGroup, (error) => {
                if (error) {
                    console.error(`Error sending 'newGroup' event to ${userSocketId}:`, error);
                } else {
                    console.log(`'newGroup' event sent successfully to ${userSocketId}`);
                }
                console.log("newGroup", newGroup)
            });
        });
        
      });
      
  
    socket.on("disconnect", (socket) => {
        console.log("User Disconnected", socket);
        users.filter((user) => user.socketID !== socket.id);
    });
})

server.listen(3001, () => {
    console.log("SERVER RUNNING")
});

function generateUniqueId() {
    return uuidv4();
  }