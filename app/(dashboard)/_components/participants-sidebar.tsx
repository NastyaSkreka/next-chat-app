"use client"
import { selectGroup } from '@/app/redux/features/users/groupSlice';
import AddUser from '@/public/addUser';
import { useSocketContext } from '@/providers/socket-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector,  useDispatch } from 'react-redux';
import { useEffect } from 'react';
import MembersList from './members-list';


function ParticipantsSidebar() {
    const { socket } = useSocketContext();
    const dispatch = useDispatch();

    const selectedGroup = useSelector((state: { groups: { selectedGroup: string | null } }) => state.groups.selectedGroup);
    console.log( "selectedGroup", selectedGroup)
  
    useEffect(() => {
        console.log('Socket connection status:', socket.connected);

        console.log("inside useEffect")

        socket.on('memberDeleted', ({ groupId, removedMember }) => {
              console.log("inside socket");
              console.log(groupId, removedMember);  
              
      if (selectedGroup && selectedGroup.id === groupId) {
          const updatedMembersArray = selectedGroup.members.filter(member => member.socketId !== removedMember.socketId);
            dispatch(selectGroup({
              id: groupId,
              name: selectedGroup.name,
              creator: selectedGroup.creator,
              members: updatedMembersArray,
            }));
          } 
        }); 
        console.log('After socket.on');
        return () => {
          socket.off('delete');
        };
      }, [socket, dispatch]); 
      
  return (
    <AnimatePresence>
    <motion.div
      initial={{ x: 250 }}  
      animate={{ x: 0 }}    
      exit={{ x: 250 }}    
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
    {selectedGroup &&  
        <>
            <div className="flex flex-col space-y-5 h-[50px]  bg-black p-4 w-full">
                        <p className="text-white text-lg">Admin: {selectedGroup.creator}</p>
                </div>
                <div className="w-[250px] bg-black p-5 mt-5">
                <div className='flex flex-row gap-7 items-center mb-10'>
                    <p className="text-white text-lg">Participants</p>
                    <AddUser/>
                </div>
                <MembersList selectedGroup={selectedGroup}/>
            </div>
        </>
    }
    </motion.div>
    </AnimatePresence>
  );
}

export default ParticipantsSidebar;

