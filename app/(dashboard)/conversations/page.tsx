import React from 'react'
import ConversationSidebar from '../_components/conversation-sidebar'
import ChatContainer from '../_components/chat-container'




function Conversations() {
    return (
      <div className='flex w-full min-h-screen'>
        <ConversationSidebar />
       <ChatContainer/>
      </div>
    )
  }
  

export default Conversations