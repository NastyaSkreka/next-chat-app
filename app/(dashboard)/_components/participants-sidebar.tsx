import { GroupState } from '@/app/redux/features/users/groupSlice';
import AddUser from '@/public/addUser';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

function ParticipantsSidebar() {

    const selectedGroup = useSelector((state: { groups: { selectedGroup: string | null } }) => state.groups.selectedGroup);
    console.log( "selectedGroup", selectedGroup)

    const currentUser  = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

    const isGroupCreator = (group, currentUser) => {
        return group.creator === currentUser;
    };

    const handleRemoveMember = () => {
        console.log("remove user")
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
                    <AddUser/>
                </div>
                <div className="flex flex-col space-y-7">
                    { 
                      selectedGroup.members.map((member) => (
                        <div className="flex flex-row gap-5 items-center cursor-pointer">
                        <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
                        <div>
                         <p className="text-base text-gray-400 " key={member.user}>{member.user} </p>  
                        </div>
                        {isGroupCreator(selectedGroup, currentUser) && (
                      <button className='text-white'
                        onClick={() => handleRemoveMember(member.id, member)}
                      >
                     
                         delete
                      </button>
                    )}
                    </div> 
                      ))
                    }
                </div>
            </div>
        </>
    }
    </motion.div>
    </AnimatePresence>
  );
}

export default ParticipantsSidebar;

