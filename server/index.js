const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = [];
const groups = [];

console.log("groups", groups);

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("send_message", (data) => {
    console.log("inside send_message");
    io.emit("receive_message", data);
  });

  socket.on("sendMessageToGroup", ({ groupId, messageData }) => {
    console.log("messageData", messageData, groupId);

    const group = groups.find((group) => group.id === groupId);

    // TODO: here we must handle all users that does not have any socket id

    if (group) {
      group.members.forEach((member) => {
        const user = users.find((user) => user.user === member.user);
        // console.log(user);
        if (user.socketId !== messageData.author) {
          io.to(member.socketId).emit("groupMessage", { messageData, groupId });
        }
      });
        // socket.emit('groupMessage', {messageData, groupId});
    }
  });

  socket.on("getConnectedUsers", () => {
    socket.emit("connectedUsers", users);
    console.log("Sending Online Users");
  });
  socket.on("newUser", (username) => {
    const isFound = users.find((user) => username === user.user);
    const newUserData = {
      user: username,
      socketId: socket.id,
      status: "active",
    };

    if (isFound) {
      users.map((user) =>
        user.user === newUserData.user ? newUserData : user
      );
      return io.emit("responseNewUser", users);
    }

    users.push(newUserData);
    console.log(users);
    io.emit("responseNewUser", users);
  });
  socket.on("createGroup", (newGroup) => {
    newGroup.id = generateUniqueId();

    groups.push(newGroup);

    console.log("inside createGroup");
    console.log(newGroup);

    // socket.emit("newGroup", newGroup, (error) => {
    //   console.log(error);
    // });

    newGroup.members.forEach((member) => {
      console.log(member);
      const userSocketId = member?.socketId;
      if (!userSocketId) return;
      console.log("sending to socket ", userSocketId);
      io.to(userSocketId).emit("newGroup", newGroup);
    });
  });
  socket.on("deleteMember", ({ groupId, memberSocketId }) => {
    const groupIndex = groups.findIndex((group) => group.id === groupId);

    if (groupIndex !== -1) {
      const removedMemberIndex = groups[groupIndex].members.findIndex(
        (member) => member.socketId === memberSocketId
      );

      if (removedMemberIndex !== -1) {
        groups[groupIndex].members[removedMemberIndex].status = "deleted";

        const updatedMembers = groups[groupIndex].members.filter(
          (member) => member.status !== "deleted"
        );

        console.log(memberSocketId);
        groups[groupIndex].members.forEach((member) => {
          if (member.socketId && member.socketId !== memberSocketId) {
            socket
              .to(member.socketId)
              .emit("groupUpdated", { groupId, members: updatedMembers });
            console.log(
              "Sending groupUpdated event to" + member?.socketId || "Not found"
            );
          }
        });

        io.to(memberSocketId).emit("userRemovedFromGroup");

        socket.emit("groupUpdated", { groupId, members: updatedMembers });

        console.log("groupUpdated", { groupId, members: updatedMembers });
      }
    }
  });
  socket.on("addMember", ({ groupId, user }) => {
    const groupIndex = groups.findIndex((group) => group.id === groupId);

    if (groupIndex !== -1) {
      const existingMember = groups[groupIndex].members.find(
        (member) => member.socketId === user.socketId
      );

      if (!existingMember) {
        groups[groupIndex].members.push({
          user: user.user,
          socketId: user.socketId,
          status: "active",
        });

        const updatedMembers = groups[groupIndex].members.filter(
          (member) => member.status !== "deleted"
        );

        groups[groupIndex].members.forEach((member) => {
          socket
            .to(member.socketId)
            .emit("groupUpdated", { groupId, members: updatedMembers });
        });

        socket.emit("groupUpdated", { groupId, members: updatedMembers });

        console.log("groupUpdated", { groupId, members: updatedMembers });
      }
    }
  });
  socket.on("deleteGroup", ({ groupId }) => {
    const groupIndex = groups.findIndex((group) => group.id === groupId);

    if (groupIndex !== -1) {
      //   const deletedGroup = groups.splice(groupIndex, 1)[0];
      const deletedGroup = groups[groupIndex];
      const updatedGroups = groups.filter((group) => group.id === groupId);
      console.log(updatedGroups);
      console.log("--------");
      console.log(deletedGroup);

      //   const updatedGroups = groups.filter((group) => !deletedGroup.members.some((member) => member.socketId === group.creator));

      deletedGroup.members.forEach((member) => {
        io.to(member.socketId).emit("groupDeleted", deletedGroup);
      });

      //   socket.emit('groupDeleted', updatedGroups);
    }
  });

  socket.on("disconnect", (socket) => {
    console.log("User Disconnected", socket);
    users.filter((user) => user.socketID !== socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

function generateUniqueId() {
  return uuidv4();
}
