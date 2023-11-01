"use client"
import React, { useEffect, useState } from "react"
import { io, Socket } from 'socket.io-client';
import ConversationSidebar from "../_components/conversation-sidebar";
import PrivateContainer from "../_components/private-container";


function Conversations() {

    const [socket,setSocket] = useState<Socket | undefined>(undefined);
    useEffect(() => {
        setSocket(io('http://localhost:3001'));
    },[]);
    if(!socket) return null;
    
  return (
    <div className="flex w-full min-h-screen">
      <ConversationSidebar socket={socket} />
      <PrivateContainer socket={socket} />
    </div>
  );
}

export default Conversations;
