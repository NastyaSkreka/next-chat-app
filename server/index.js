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
        const newUserData = { user: username, socketId: socket.id, status:'active'};

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
            console.log(member);
            const userSocketId = member?.socketId;
            if(!userSocketId) return;
            console.log('sending to socket ', userSocketId);
            io.to(userSocketId).emit('newGroup', newGroup);
        });
      });

      socket.on('deleteGroup', ({ groupId }) => {
        const groupIndex = groups.findIndex((group) => group.id === groupId);
      
        if (groupIndex !== -1) {
          const deletedGroup = groups.splice(groupIndex, 1)[0];
           
          const updatedGroups = groups.filter((group) => !deletedGroup.members.some((member) => member.socketId === group.creator));

          deletedGroup.members.forEach((member) => {
            socket.to(member.socketId).emit('groupDeleted', updatedGroups);
          });

          io.emit('groupDeleted', updatedGroups);
      
        }
      });
      
      

    socket.on('addMember', ({ groupId, user }) => {
        const groupIndex = groups.findIndex((group) => group.id === groupId);
    
        if (groupIndex !== -1) {
            const existingMember = groups[groupIndex].members.find((member) => member.socketId === user.socketId);
    
            if (!existingMember) {
                groups[groupIndex].members.push({
                    user: user.user,
                    socketId: user.socketId,
                    status: 'active',
                });
    
                const updatedMembers = groups[groupIndex].members.filter(member => member.status !== 'deleted');
    
                groups[groupIndex].members.forEach((member) => {
                    socket.to(member.socketId).emit('groupUpdated', { groupId, members: updatedMembers });
                });
    
                socket.emit('groupUpdated', { groupId, members: updatedMembers });
    
                console.log('groupUpdated', { groupId, members: updatedMembers });
            }
        }
    });

    socket.on('deleteGroup', ({ groupId }) => {
        const groupIndex = groups.findIndex((group) => group.id === groupId);
      
        if (groupIndex !== -1) {
          const deletedGroup = groups.splice(groupIndex, 1)[0];
        
          deletedGroup.members.forEach((member) => {
            io.to(member.socketId).emit('groupDeleted', deletedGroup);
          });
      
          io.to(deletedGroup.creator).emit('groupDeleted', deletedGroup);
          console.log('groupDeleted', deletedGroup);
        }
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