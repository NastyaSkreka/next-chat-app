"use client"
import { deleteGroup, selectGroup, updateGroupMembers, updateGroups } from '@/app/redux/features/users/groupSlice';
import AddUser from '@/public/addUser';
import { useSocketContext } from '@/providers/socket-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import MembersList from './members-list';
import AddMembersModal from '@/components/addmembers-modal';
import { useRouter } from 'next/navigation';

const currentUser = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

function ParticipantsSidebar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { socket } = useSocketContext();
    const dispatch = useDispatch();
    const router = useRouter();

    const selectedGroup = useSelector((state: { groups: { selectedGroup: string | null } }) => state.groups.selectedGroup);
    console.log("selectedGroup", selectedGroup)

    // 5 mins and i will come back now it's working try to test it again till i come back.. 
    // okay ? ok 
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
            // window.location.href = '/groups';
            router.push('/groups');
        });

        socket.on('groupDeleted', ({id}) => {
            console.log("deletedGroup", id)
            dispatch(deleteGroup(id as string));
            
        });

        console.log('After socket.on');
    
        return () => {
            socket.off('groupUpdated');
            socket.off('userRemovedFromGroup');
        };
    }, [socket, dispatch, selectedGroup]);

    const handleDeleteGroup = (groupId: string) => {
        console.log("selectedGroup.id", groupId)
      //console.log(typeof(groupId)) 
      dispatch(deleteGroup(groupId));
        socket.emit('deleteGroup', { groupId });
      };
      

    const handleOpenModal = () => {
        setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      };

      const userIsGroupCreator = (group) => {
        return currentUser === group.creator;
      }
    

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
                        <div className=" flex flex-col flex-1  space-y-5 h-[50px]  bg-black p-4 w-full">
                            <p className="text-white text-lg">Admin: {selectedGroup.creator}</p>
                        </div>
                        <div className="w-[250px] flex flex-col  bg-black p-5 mt-5">
                            <div className='flex  flex-row gap-7 justify-between items-center mb-10'>
                                <p className="text-white text-lg">Participants</p>
                                <div onClick={handleOpenModal}>
                                <AddUser />
                                </div>
                                {isModalOpen && <AddMembersModal onClose={handleCloseModal}  selectedGroup={selectedGroup}/>}
                            </div>
                            <MembersList selectedGroup={selectedGroup} />
                                {
                                userIsGroupCreator(selectedGroup) && (
                                    <div onClick={() => handleDeleteGroup(selectedGroup.id)}
                                    className='flex-end'>
                                    <button  className=" hover:bg-red-800 w-full text-lg bg-neutral-800 text-white rounded">
                                        Delete
                                    </button>
                                </div>
                                )
                            }
                                 
                        </div>    
                    </>
                   
                }
            </motion.div>
        </AnimatePresence>
    );
}

export default ParticipantsSidebar;

