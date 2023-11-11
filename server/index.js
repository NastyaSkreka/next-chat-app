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

const users = [
    {
        user: "Nastya", id: '4738974'
    },
    {
        user: "Lena", id: '4738975'
    }
];
const groups = []; 


io.on("connection", (socket) => {
    console.log("User Connected" , socket.id)

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
        console.log(data);
        io.emit("responseNewUser", users);
      });
  

      socket.on('createGroup', (newGroup) => {
        newGroup.id = generateUniqueId();
      
        groups.push(newGroup);
      
        console.log('inside createGroup');

        console.log(newGroup);
      
      
        newGroup.members.forEach((member) => {
            io.to(member.socketID).emit('newGroup', newGroup, (error) => {
                if (error) {
                    console.error(`Error sending 'newGroup' event to ${member.socketID}:`, error);
                } else {
                    console.log(`'newGroup' event sent successfully to ${member.socketID}`);
                }
                console.log("newGroup", newGroup)
            });
        });
        
      });
      
  
    socket.on("disconnect", (socket) => {
        console.log("User Disconnected", socket.id);
        users.filter((user) => user.socketID !== socket.id);
    });
})

server.listen(3001, () => {
    console.log("SERVER RUNNING")
});

function generateUniqueId() {
    return uuidv4();
  }