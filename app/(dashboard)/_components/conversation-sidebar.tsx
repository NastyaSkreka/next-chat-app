"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { ConversationState, setActiveUser } from "@/app/redux/features/users/conversationSlice";


const ConversationSidebar: React.FC = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const dispatch = useDispatch();
    
    const activeUser = useSelector(
        (state: { conversation: ConversationState }) => state.conversation.activeUser,
    ); 
    const sidebarData = useSelector(
    (state: { conversation: ConversationState }) => state.conversation.sidebarData,
    ); 

      
    const handleSetActiveUser = (user:string) => {
        dispatch(setActiveUser(user));
    };

    const handleSearchInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
      
    const filteredSidebarData = sidebarData.filter((item) =>
      item.user.toLowerCase().includes(searchInput.toLowerCase()) 
    );
    
    return (
        <div className="w-[300px] bg-black p-5 relative">
                 <div className="absolute inset-y-0 right-0 w-0.5 bg-white shadow-md"></div>
            <div className="flex flex-row gap-3 mb-7">
                <Input placeholder="Search for Conversations" 
                value={searchInput}
                onChange={handleSearchInputChange}
                />
            </div>
            <div className="absolute inset-x-0 top-15 h-0.5 bg-white shadow-md " ></div>

            <div className="flex flex-col space-y-5 ">
                {filteredSidebarData.map((item, index) => (
                    <div
                        key={index}
                        className={`flex mt-7 flex-row gap-5 items-centerd
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

