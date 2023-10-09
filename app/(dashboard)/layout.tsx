import UserSidebar from '@/app/(dashboard)/_components/user-sidebar'
import React, { PropsWithChildren } from 'react'
import GroupSidebar from './_components/group-sidebar'

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className='bg-slate-400 w-full h-full flex'>
        <UserSidebar />
        {children}
    </div>
  )
}

export default DashboardLayout