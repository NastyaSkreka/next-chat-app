"use client"
import React, { useState } from "react"
import { io, Socket } from 'socket.io-client';
import ConversationSidebar from "../_components/conversation-sidebar";
import PrivateContainer from "../_components/private-container";

const socket: Socket = io('http://localhost:3001');

function Conversations() {

  return (
    <div className="flex w-full min-h-screen">
      <ConversationSidebar />
      <PrivateContainer socket={socket} />
    </div>
  );
}

export default Conversations;
