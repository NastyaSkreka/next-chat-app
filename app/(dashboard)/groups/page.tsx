"use client";

import React, { useState } from "react";
import GroupSidebar from "../_components/group-sidebar";
import GroupsContainer from "../_components/groups-container";
import ParticipantsSidebar from "../_components/participants-sidebar";

type Group = {
    id: string;
    name: string;
};

function Groups() {
    const [sidebarOpen, setIsSidebarOpen] = useState("");

    const handleSidebarToggle = (group:Group) => {
      if (sidebarOpen && sidebarOpen.name === group.name) {
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
