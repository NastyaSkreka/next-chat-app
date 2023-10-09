import React from 'react'
import GroupSidebar from '../_components/group-sidebar'
import UserSidebar from '../_components/user-sidebar'

function Groups() {
  return (
    <div className='flex w-full'>
        <GroupSidebar />
        <div>
            Messages
        </div>
    </div>
  )
}

export default Groups