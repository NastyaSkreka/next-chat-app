import Delete from '@/public/delete';
import { useSocketContext } from '@/providers/socket-provider';
import { Group } from '@/app/redux/features/users/groupSlice';

interface MembersListProps {
    selectedGroup: Group;
  }

function MembersList({selectedGroup}:MembersListProps){

    const { socket } = useSocketContext();

    const currentUser  = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

    const isGroupCreator = (group:Group, currentUser: string | null) => {
        return group.creator === currentUser;
    };

    const handleRemoveMember = (socketId:string) => {
    socket.emit('deleteMember', { groupId: selectedGroup.id, memberSocketId: socketId });
    };

    return (
        <div className="flex flex-grow flex-col py-7 space-y-5">
      { 
            selectedGroup.members.map((member) => (
                !isGroupCreator(selectedGroup, member.user) && (
                    <div className="flex flex-row gap-5 items-center justify-between cursor-pointer" key={member.user}>
                        <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
                        <div>
                            <p className="text-base text-gray-400 ">{member.user}</p>  
                        </div>
                        <div className='flex justify-end'>
                            {isGroupCreator(selectedGroup, currentUser) && (
                                <button className='text-white' onClick={() => handleRemoveMember(member.socketId)}>
                                    <Delete/>
                                </button>
                            )}
                        </div>
                    </div> 
                )
            ))
        }
        </div>
        )
}

export default MembersList;