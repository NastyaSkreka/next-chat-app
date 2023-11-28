"use client"
import { ConversationState} from '@/app/redux/features/users/conversationSlice';
import React from 'react';
import {  useSelector } from 'react-redux';
import { Button } from './ui/button';
import { useSocketContext } from '@/providers/socket-provider';
import AddMember from '@/public/addMember';


interface GroupModalProps {
  onClose: () => void;
}

const AddMembersModal: React.FC<GroupModalProps> = ({ onClose, selectedGroup }) => {
    const { socket } = useSocketContext();

    const users = useSelector(
    (state: { conversation: ConversationState }) => state.conversation.sidebarData,
  );
 console.log("users", users)
 console.log("selectedGroup", selectedGroup)

 const usersNotInGroup = users.filter(user => !selectedGroup.members.some(member => member.socketId === user.socketId));

  console.log("usersNotInGroup", usersNotInGroup)

  const handleAddMember = (user) => {
    console.log("user который идет на сервер handleAddMember", user)
    console.log('Новый участник отправен на сервер:', socket.connected);
    socket.emit('addMember', { groupId: selectedGroup.id, user });
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="space-y-7 bg-black w-96 mx-auto rounded shadow-md p-4 relative">
          <h2 className="text-lg text-white font-semibold text-center mb-2">Add Participants</h2>
          {usersNotInGroup.map((item) => (
            <div
            key={item.socketID}>
              <div className="flex flex-row gap-5 items-center justify-between cursor-pointer border-2 border-neutral-900 rounded-lg px-2">
                <div className="w-16 h-16  bg-zinc-300 rounded-full overflow-hidden" />
                <div>
                  <p className="text-lg font-semibold text-white mb-1">{item.user}</p>
                </div>
                <div className='flex justify-end'  onClick={() => handleAddMember(item)}>
                   <AddMember/>
                </div>
              </div>
             
            </div>
          ))}
            <div className="flex justify-start">
            <Button onClick={onClose} className="bg-gray-500 hover:bg-red-800">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AddMembersModal;

  