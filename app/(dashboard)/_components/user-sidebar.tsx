import React from 'react'
import USER from '@/public/photo_2023-10-03_21-43-04.jpg'
import Image from 'next/image';
import Chat from '@/public/chat';
import Group from '@/public/group';
import Refresh from '@/public/refresh';

function UserSidebar() {
  return (
    <div className='w-40 bg-black '>
        <div className='flex justify-center py-5'>
            <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image
        src={USER}
        alt="Картинка"
        className="w-full h-full object-cover"
      />        
        </div>

        </div>
    <div className='flex flex-col items-center space-y-7 mt-10'>
        <Chat/>
        <Group/>
        <Refresh/>
    </div>
    </div>
  )
}

export default UserSidebar