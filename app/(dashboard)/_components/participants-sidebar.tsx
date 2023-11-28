"use client"
import { selectGroup, updateGroupMembers } from '@/app/redux/features/users/groupSlice';
import AddUser from '@/public/addUser';
import { useSocketContext } from '@/providers/socket-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import MembersList from './members-list';
import AddMembersModal from '@/components/addmembers-modal';


function ParticipantsSidebar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { socket } = useSocketContext();
    const dispatch = useDispatch();

    const selectedGroup = useSelector((state: { groups: { selectedGroup: string | null } }) => state.groups.selectedGroup);
    console.log("selectedGroup", selectedGroup)

    useEffect(() => {
        socket.on('groupUpdated', ({ groupId, members }) => {
            console.log("inside socket");
            console.log('groupUpdated useEffect', groupId, members);           
    
            dispatch(selectGroup({
                id: groupId,
                name: selectedGroup.name,
                creator: selectedGroup.creator,
                members: members,
            }));
   
            dispatch(updateGroupMembers({ groupId, updatedMembers: members }));
        });

        socket.on('userRemovedFromGroup', () => {
            window.location.href = '/groups';
        });

        console.log('After socket.on');
    
        return () => {
            socket.off('groupUpdated');
            socket.off('userRemovedFromGroup');
        };
    }, [socket, dispatch, selectedGroup]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      };
    

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
                                <div onClick={handleOpenModal}>
                                <AddUser />
                                </div>
                                {isModalOpen && <AddMembersModal onClose={handleCloseModal}  selectedGroup={selectedGroup}/>}
                            </div>
                            <MembersList selectedGroup={selectedGroup} />
                        </div>
                    </>
                }
            </motion.div>
        </AnimatePresence>
    );
}

export default ParticipantsSidebar;

