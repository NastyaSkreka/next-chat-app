"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Add from "@/public/add";
import { useSocketContext } from "@/providers/socket-provider";
import GroupModal from "@/components/group-modal";
import { useDispatch, useSelector } from "react-redux";
import { Group, GroupState,  addGroup, selectGroup } from "@/app/redux/features/users/groupSlice";

interface GroupSidebarProps {
    onMessageClick: (group: Group) => void;
}

const GroupSidebar: React.FC<GroupSidebarProps> = ({ onMessageClick }) => {
    const { socket } = useSocketContext(); 
    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState<string>("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedGroupState, setSelectedGroupState] = useState<string | null>(null);

   const selectedGroup = useSelector((state: { groups: { selectedGroup: string | null } }) => state.groups.selectedGroup);

    console.log("selectedGroup in group sidebar", selectedGroup )

   const groups = useSelector(
        (state: { groups: GroupState }) => state.groups.groups,
    );  

    console.log("groups", groups)
 

    const handleGroupClick = (group: Group) => {
        dispatch(selectGroup(group));
        onMessageClick(group);
        setSelectedGroupState(group.name);
        console.log(group)
    };

    
 /*   useEffect(() => {
        console.log('group-sidebar')
        socket.on('newGroup', (newGroup) => {
          const groupExists = groups.find((group) => group.name === newGroup.name);
          if(!groupExists) {
           dispatch(addGroup(newGroup));
          }
        });
    
        return () => {
          socket.off('newGroup');
        }; 
      }, [username, socket]); */
      
    
      

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
    <div className="w-[300px] bg-black p-5 relative">
          <div className="absolute inset-y-0 right-0 w-0.5 bg-white shadow-md"></div>
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
      <div className="absolute inset-x-0 top-15 h-0.5 bg-white shadow-md " ></div>
      <div className="flex flex-col space-y-5">
        {
            groups.map((group) =>(
                    <div
                      key={group.name}
                      className={`flex flex-row gap-5 items-center  mt-7 cursor-pointer ${
                        selectedGroup?.id == group.id ? 'bg-neutral-900 text-white rounded-lg' : ""
                      }`}
                      onClick={() => handleGroupClick(group)}
                    >
                      <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
                      <div>
                      <p className="text-lg font-semibold text-white mb-1">
                            {group.name ? group.name : "no name group"}
                        </p>
                      </div>
                    </div>
                  )
              )             
        } 
      </div>
    </div>
  );
};

export default GroupSidebar;
