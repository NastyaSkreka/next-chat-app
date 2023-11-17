"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Add from "@/public/add";
import SwitchButtons from "@/components/switch-buttons";
import { useSocketContext } from "@/providers/socket-provider";
import GroupModal from "@/components/group-modal";
import { useDispatch, useSelector } from "react-redux";
import { GroupState, addGroup, selectGroup } from "@/app/redux/features/users/groupSlice";

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
    const [searchInput, setSearchInput] = useState<string>("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const dispatch = useDispatch()
    const groups = useSelector(
        (state: { groups: GroupState }) => state.groups.groups,
    ); 

    const handleGroupClick = (group) => {
        dispatch(selectGroup(group));
        onMessageClick(group);
        setSelectedGroup(group.name);
        console.log(group, "click")
    };

    useEffect(() => {
        socket.on('newGroup', (newGroup) => {
          console.log('inside newGroup', newGroup);
          const groupExists = groups.find((group) => group.name === newGroup.name);
          if(!groupExists) {
           dispatch(addGroup(newGroup));
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
            className={`flex flex-row gap-5 items-center cursor-pointer ${
                selectedGroup === group.name ? 'bg-neutral-900 text-white rounded-lg' : ""
            }`}
            onClick={() => {
                handleGroupClick(group);
              }}
            >
            <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
            <div>
             <p className="text-lg font-semibold text-white mb-1">{group.name}</p>
             <p className="text-lg font-semibold text-white mb-1">Message</p>
            </div>
            </div>
          ))  
        }
      </div>
    </div>
  );
};

export default GroupSidebar;
