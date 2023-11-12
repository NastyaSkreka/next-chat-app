"use client";

import React, { useState } from "react";
import GroupSidebar from "../_components/group-sidebar";
import GroupsContainer from "../_components/groups-container";
import ParticipantsSidebar from "../_components/participants-sidebar";

function Groups() {
    const [sidebarOpen, setIsSidebarOpen] = useState("");

    console.log("isSidebarOpen", sidebarOpen);
  
    const handleSidebarToggle = (group) => {
      if (sidebarOpen && sidebarOpen.name === group.name) {
        // Если кликнули на ту же группу, закрываем Sidebar
        setIsSidebarOpen("");
      } else {
        setIsSidebarOpen(group);
      }
    };

  return (
    <div className="flex overflow-hidden w-full min-h-screen">
      <GroupSidebar onMessageClick={(group) => handleSidebarToggle(group)} />
      <GroupsContainer />
      {sidebarOpen && <ParticipantsSidebar />}
    </div>
  );
}

export default Groups;
