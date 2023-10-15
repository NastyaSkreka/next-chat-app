"use client"
import React  from 'react'
import { Input } from '@/components/ui/input'
import Add from '@/public/add'
import SwitchButtons from '@/components/switch-buttons'

interface GroupSidebarProps {
    onMessageClick: () => void;
  }


  const GroupSidebar: React.FC<GroupSidebarProps> = ({ onMessageClick }) =>{

    const handleMessageClick = () => {
        onMessageClick();
      };
   
  return (
    <div className='w-[300px] bg-black p-5'>
    <div className='flex flex-row gap-3 mb-7'>
        <Input placeholder="Seach of Consersations"/>
        <Add/>
   </div>
   <SwitchButtons/>
   <div className='flex flex-col space-y-5'>
    <div className='flex flex-row gap-5 items-center cursor-pointer' onClick={handleMessageClick}>
        <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden"/>
        <div>
            <p className='text-lg font-semibold text-white mb-1'>Nastya</p>
            <p className='text-sm text-gray-400'>Hello</p>
        </div>
   </div>
   <div className='flex flex-row gap-5 items-center cursor-pointer' onClick={handleMessageClick}>
        <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden"/>
        <div>
            <p className='text-lg font-semibold text-white mb-1'>Anastasiia</p>
            <p className='text-sm text-gray-400'>hi</p>
        </div>
   </div>
   </div>
 
 </div>
  )
}

export default GroupSidebar

