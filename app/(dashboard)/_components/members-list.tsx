import Delete from '@/public/delete';
import { useSocketContext } from '@/providers/socket-provider';


function MembersList({selectedGroup}){
    
    const { socket } = useSocketContext();
    const currentUser  = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

    const isGroupCreator = (group, currentUser) => {
        return group.creator === currentUser;
    };

    const handleRemoveMember = (socketId) => {
    console.log('Статус подключения сокета перед отправкой:', socket.connected);
    socket.emit('deleteMember', { groupId: selectedGroup.id, memberSocketId: socketId });
    };

    return (
        <div className="flex flex-col space-y-7">
                    { 
                      selectedGroup.members.map((member) => (
                        <div className="flex flex-row gap-5 items-center  justify-between cursor-pointer">
                        <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
                        <div>
                         <p className="text-base text-gray-400 " key={member.user}>{member.user} </p>  
                        </div>
                        <div className='flex justify-end'>
                        {isGroupCreator(selectedGroup, currentUser) && (
                        <button className='text-white'
                            onClick={() => handleRemoveMember(member.socketId)}
                      >
                        <Delete/>
                      </button>
                      
                    )}
                    </div>
                    </div> 
                      ))
                    }
        </div>
    )
}

export default MembersList;