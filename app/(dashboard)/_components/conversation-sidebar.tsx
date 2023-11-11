"use client"
import React, { useEffect, useState } from "react";
import SwitchButtons from "@/components/switch-buttons";
import { Input } from "@/components/ui/input";
import Add from "@/public/add";
import { useDispatch, useSelector } from "react-redux";
import { ConversationState, setActiveUser, setSidebarData } from "@/app/redux/features/users/conversationSlice";
import GroupModal from "@/components/group-modal";

const ConversationSidebar: React.FC = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const activeUser = useSelector(
        (state: { conversation: ConversationState }) => state.conversation.activeUser,
      ); 
    const sidebarData = useSelector(
    (state: { conversation: ConversationState }) => state.conversation.sidebarData,
    ); 

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };
  
    const handleSetActiveUser = (user:any) => {
        dispatch(setActiveUser(user));
    };

    const handleSearchInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
      };
      
      const filteredSidebarData = sidebarData.filter((item) =>
      item.user.toLowerCase().includes(searchInput.toLowerCase()) 
    );
    
    return (
        <div className="w-[300px] bg-black p-5">
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
            <SwitchButtons />

            <div className="flex flex-col space-y-5 ">
                {filteredSidebarData.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-row gap-5 items-center
                        ${ item.user === activeUser ? 'bg-neutral-900 text-white rounded-lg' : ''}`}
                        onClick={() => handleSetActiveUser(item.user)}
                    >
                        <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
                        <div>
                            <p className="text-lg font-semibold text-white mb-1">{item.user}</p>
                            <p className="text-sm text-gray-400">Message</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConversationSidebar;

