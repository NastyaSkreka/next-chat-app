import { ConversationState} from '@/app/redux/features/users/conversationSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { addGroup } from '@/app/redux/features/users/groupSlice';

interface GroupModalProps {
  onClose: () => void;
  activeUsers: string[];
}

const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

const GroupModal: React.FC<GroupModalProps> = ({ onClose }) => {
    const dispatch = useDispatch();
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = useSelector(
    (state: { conversation: ConversationState }) => state.conversation.sidebarData,
    ); 
    

  const handleGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleParticipantChange = (username) => {
    if (selectedUsers.includes(username)) {
      setSelectedUsers(selectedUsers.filter((user) => user !== username));
    } else {
      setSelectedUsers([...selectedUsers, username]);
    }
  };
  
  
  
  const handleSubmit = () => {

    const newGroup = {
        name: groupName, 
        creator: username, 
        members: [...selectedUsers, username], 
    };

    dispatch(addGroup(newGroup))

    console.log(newGroup)

    onClose();
  };

  return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div className="space-y-7 bg-black w-96 mx-auto rounded shadow-md p-4 relative">
        <h2 className="text-lg text-white font-semibold  text-center">Create a Group</h2>
        <label className="block text-sm text-white font-medium " htmlFor="groupName">
        Group Name:
        </label>
        <input
        type="text"
        id="groupName"
        className="w-full p-2 border rounded"
        value={groupName}
        onChange={handleGroupNameChange}
        />
        <h3 className="text-sm text-white font-semibold ">Select Participants:</h3>
        {users.map((item) => (
            <div key={item.socketID} className="flex items-center">
                <div  onClick={() => handleParticipantChange(item.user)}
                 className={`flex w-full flex-row gap-5 items-center cursor-pointer ${
                    selectedUsers[item.user] ? 'bg-neutral-900 text-white rounded-lg' : ''
                }`}
                 >
                <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
                <div>
                    <p className="text-lg font-semibold text-white mb-1">{item.user}</p>
                </div>
                </div>
            </div>
        ))}

        <div className="flex justify-end gap-5">
        <Button
             onClick={handleSubmit}
          className="bg-gray-500 hover:bg-gray-600"  
        >
         Create Group
        </Button>
        <Button
             onClick={onClose}
          className="bg-gray-500 hover:bg-red-800"  
        >
         Cancel
        </Button>
        </div>
    </div>
    </div>

  );
};

export default GroupModal;

   