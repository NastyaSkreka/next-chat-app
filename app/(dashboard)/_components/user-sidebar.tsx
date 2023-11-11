'use client';

import React, { useEffect } from "react";
import USER from "@/public/photo_2023-10-03_21-43-04.jpg";
import Image from "next/image";
import Chat from "@/public/chat";
import Group from "@/public/group";
import Refresh from "@/public/refresh";
import { useSocketContext } from "@/providers/socket-provider";
import { setSidebarData } from "@/app/redux/features/users/conversationSlice";
import { useDispatch } from "react-redux";

function UserSidebar() {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  
  useEffect(() => {
      const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;
      socket.emit('newUser', username);
  },[]);

  useEffect(() => {
    const username = localStorage.getItem('username') || '';

    socket.on('connectedUsers', (users) => {
      const filteredUsers = users.filter((user:any) => user.user !== username);
      dispatch(setSidebarData(filteredUsers));
    });
    socket.emit('getConnectedUsers', null);
    socket.on("responseNewUser", (data) => {
      const filteredData = data.filter((user:any) => user.user !== username);
      dispatch(setSidebarData(filteredData));
    });

    return () => {
      // socket.off('getConnectedUsers');
      socket.off('responseNewUser');
      socket.off('connectedUsers');
    };
  }, [socket]);

  return (
    <div className="w-40 bg-black ">
      <div className="flex justify-center py-5">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={USER}
            alt="Картинка"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-7 mt-10">
        <Chat />
        <Group />
        <Refresh />
      </div>
    </div>
  );
}

export default UserSidebar;
