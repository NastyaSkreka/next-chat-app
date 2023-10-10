import UserSidebar from '@/app/(dashboard)/_components/user-sidebar'
import React, { PropsWithChildren } from 'react'
import GroupSidebar from './_components/group-sidebar'
import Message from '@/components/message'

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex bg-black w-full'>
        <UserSidebar />
        {children}
    </div>
  )
}

export default DashboardLayout