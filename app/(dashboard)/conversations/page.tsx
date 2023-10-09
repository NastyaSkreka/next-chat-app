import React from 'react'
import ConversationSidebar from '../_components/conversation-sidebar'
import UserSidebar from '../_components/user-sidebar'

function Conversations() {
  return (
    <div className='flex'>
        <ConversationSidebar />
        <div>
            Messages
        </div>
    </div>
  )
}

export default Conversations