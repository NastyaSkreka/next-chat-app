"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Add from "@/public/add";
import SwitchButtons from "@/components/switch-buttons";
import { useSelector,  useDispatch} from "react-redux";
import { addGroup } from "@/app/redux/features/users/groupSlice";
import { io, Socket } from 'socket.io-client';

 const socket: Socket = io('http://localhost:3001');

 const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

interface GroupSidebarProps {
  onMessageClick: () => void;
  socket: Socket;
}

type Group = {
    id: string;
    name: string;
    
  };

const GroupSidebar: React.FC<GroupSidebarProps> = ({ onMessageClick }) => {
  /*  const groups = useSelector(
        (state: { groups:any}) => state.groups.groups,
    );  */

    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        socket.on('newGroup', (newGroup) => {
          if (newGroup.members.some(member => member.user === username)) {
            setGroups(newGroup);
          }
        });
    
        return () => {
          socket.off('newGroup');
        };
      }, [username]);
      

    console.log("groups", groups)

    return (
    <div className="w-[300px] bg-black p-5">
      <div className="flex flex-row gap-3 mb-7">
        <Input placeholder="Seach of Consersations" />
        <Add />
      </div>
      <SwitchButtons />
      <div className="flex flex-col space-y-5">
        {
          groups.map((group:any) => (
            <div
            key={group.id}
            className="flex flex-row gap-5 items-center cursor-pointer"
            onClick={onMessageClick}
            >
            <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
            <div>
             <p className="text-lg font-semibold text-white mb-1">{group.name}</p>
                <p className="text-sm text-gray-400">Creator {group.creator}</p>
                {
                    group.members.map((member) => (
                        <p className="text-sm text-gray-400">Members {member.user} </p> 
                    ))
                }
               
            </div>
            </div>
          ))  
        }
            <div
            className="flex flex-row gap-5 items-center cursor-pointer"
            onClick={onMessageClick}
            >
            <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
            <div>
                <p className="text-lg font-semibold text-white mb-1">Nastya</p>
                <p className="text-sm text-gray-400">Hello</p>
            </div>
            </div>
        <div
          className="flex flex-row gap-5 items-center cursor-pointer"
          onClick={onMessageClick}
        >
          <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
          <div>
            <p className="text-lg font-semibold text-white mb-1">Anastasiia</p>
            <p className="text-sm text-gray-400">hi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSidebar;
