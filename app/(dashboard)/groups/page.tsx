import React from 'react'
import GroupSidebar from '../_components/group-sidebar'
import ChatContainer from '../_components/chat-container'

function Groups() {
  return (
    <div className='flex w-full min-h-screen'>
    <GroupSidebar />
    <ChatContainer/>
  </div>
  )
}

export default Groups