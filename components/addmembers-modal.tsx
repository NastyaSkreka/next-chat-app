"use client"
import { ConversationState, User} from '@/app/redux/features/users/conversationSlice';
import React from 'react';
import {  useSelector } from 'react-redux';
import { Button } from './ui/button';
import { useSocketContext } from '@/providers/socket-provider';
import AddMember from '@/public/addMember';
import { Group } from '@/app/redux/features/users/groupSlice';


interface GroupModalProps {
  onClose: () => void;
  selectedGroup: Group;
}

const AddMembersModal: React.FC<GroupModalProps> = ({ onClose, selectedGroup }) => {
    const { socket } = useSocketContext();

    const users = useSelector(
    (state: { conversation: ConversationState }) => state.conversation.sidebarData,
  );


 const usersNotInGroup = users.filter(user => !selectedGroup.members.some(member => member.socketId === user.socketId));

  const handleAddMember = (user:User) => {
    socket.emit('addMember', { groupId: selectedGroup.id, user });
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-white opacity-20"></div>
        <div className="space-y-7 bg-black w-96 mx-auto rounded shadow-md p-4 relative">
          <h2 className="text-lg text-white font-semibold text-center mb-2">Add Participants</h2>
          {usersNotInGroup.length > 0 ? (
                usersNotInGroup.map((item) => (
                    <div key={item.socketId}>
                    <div className="flex flex-row gap-5 items-center justify-between cursor-pointer border-2 border-neutral-900 rounded-lg px-2">
                        <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
                        <div>
                        <p className="text-lg font-semibold text-white mb-1">{item.user}</p>
                        </div>
                        <div className='flex justify-end'  onClick={() => handleAddMember(item)}>
                        <AddMember/>
                        </div>
                    </div>
                    </div>
                ))
                ) : (
                <p className='text-white text-center text-xl'>No users</p>
                )}
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

  