'use client';

import React, { PropsWithChildren } from "react";
import UserSidebar from "@/app/(dashboard)/_components/user-sidebar";
import SocketProvider from "../../providers/socket-provider";
import SocketComponent from "./_components/socket";

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SocketProvider>
      <div className="flex bg-black w-full">
        <UserSidebar />
        <SocketComponent />
        {children}
      </div>
    </SocketProvider>
  );
}

export default DashboardLayout;
// git revert ? 
// no no