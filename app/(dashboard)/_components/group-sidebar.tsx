"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Add from "@/public/add";
import SwitchButtons from "@/components/switch-buttons";
import { useSocketContext } from "@/providers/socket-provider";
import GroupModal from "@/components/group-modal";

 const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

interface GroupSidebarProps {
  onMessageClick: () => void;
}

type Group = {
    id: string;
    name: string;
  };

const GroupSidebar: React.FC<GroupSidebarProps> = ({ onMessageClick }) => {
    const { socket } = useSocketContext();
    const [groups, setGroups] = useState<Group[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        socket.on('newGroup', (newGroup) => {
          console.log('inside newGroup', newGroup);
          const groupExists = groups.find((group) => group.name === newGroup.name);
          if(!groupExists) {
            setGroups(prev => [newGroup, ...prev]);
          }
        });
    
        return () => {
          socket.off('newGroup');
        };
      }, [username, socket]);
      

    const handleSearchInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    };

    const handleOpenModal = () => {
      setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
};

    return (
    <div className="w-[300px] bg-black p-5">
      <div className="flex flex-row gap-3 mb-7">
      <div className="flex flex-row gap-3 mb-7">
          <Input placeholder="Search for Conversations" 
          value={searchInput}
          onChange={handleSearchInputChange}
          />
          <div onClick={handleOpenModal}>
          <Add/>
          </div>
          {isModalOpen && <GroupModal onClose={handleCloseModal} />}
      </div>
      </div>
      <SwitchButtons />
      <div className="flex flex-col space-y-5">
        {
          groups.map((group:any) => (
            <div
            key={group.name}
            className="flex flex-row gap-5 items-center cursor-pointer"
            onClick={onMessageClick}
            >
            <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
            <div>
             <p className="text-lg font-semibold text-white mb-1">{group.name}</p>
                <p className="text-sm text-gray-400">Creator {group.creator}</p>
                {
                    group.members.map((member) => (
                        <p className="text-sm text-gray-400" key={member.user}>Members {member.user} </p> 
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
