"use client"

import ConversationSidebar from "../_components/conversation-sidebar";
import PrivateContainer from "../_components/private-container";


function Conversations() {
  return (
    <div className="flex w-full min-h-screen">
      <ConversationSidebar />
      <PrivateContainer />
    </div>
  );
}

export default Conversations;
