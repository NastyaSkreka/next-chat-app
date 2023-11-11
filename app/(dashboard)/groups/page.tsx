"use client";
import React, { useEffect, useState } from "react";
import GroupSidebar from "../_components/group-sidebar";
import GroupsContainer from "../_components/groups-container";
import ParticipantsSidebar from "../_components/participants-sidebar";
import { io, Socket } from 'socket.io-client';

function Groups() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="flex overflow-hidden w-full min-h-screen">
      <GroupSidebar onMessageClick={handleSidebarToggle} />
      <GroupsContainer />
      {isSidebarOpen && <ParticipantsSidebar />}
    </div>
  );
}

export default Groups;
