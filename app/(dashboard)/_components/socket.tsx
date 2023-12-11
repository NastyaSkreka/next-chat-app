"use client"

import { useEffect } from "react";
import { useSocketContext } from "@/providers/socket-provider";
import { useDispatch, useSelector } from "react-redux";
import { GroupState, addGroup, deleteGroup, selectGroup, updateGroupMembers } from "@/app/redux/features/users/groupSlice";
import { useRouter } from 'next/navigation';
import { ConversationState, setSidebarData } from "@/app/redux/features/users/conversationSlice";
import { addMessage } from "@/app/redux/features/messages/privateMessageSlice";

const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

const SocketComponent: React.FC = () => {
    const { socket } = useSocketContext(); 
    const router = useRouter();
    const dispatch = useDispatch()
    const groups = useSelector(
        (state: { groups: GroupState }) => state.groups.groups,
    ); 
    const activeUser = useSelector(
        (state: { conversation: ConversationState }) => state.conversation.activeUser,
    );
    const selectedGroup = useSelector((state: { groups: { selectedGroup: string | null } }) => state.groups.selectedGroup);
    // new user 
    useEffect(() => {
        const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;
        socket.emit('newUser', username);
    },[]); 
  
    useEffect(() => {
      const username = localStorage.getItem('username') || '';
  
      socket.on('connectedUsers', (users) => {
        const filteredUsers = users.filter((user:any) => user.user !== username);
        dispatch(setSidebarData(filteredUsers));
      });
      socket.emit('getConnectedUsers', null);
      socket.on("responseNewUser", (data) => {
        const filteredData = data.filter((user:any) => user.user !== username);
        dispatch(setSidebarData(filteredData));
      });
  
      return () => {
        socket.off('responseNewUser');
        socket.off('connectedUsers');
      };
    }, [socket]); 

    // create new group
    useEffect(() => {
        console.log('group-sidebar')
        socket.on('newGroup', (newGroup) => {
          const groupExists = groups.find((group) => group.name === newGroup.name);
          if(!groupExists) {
           dispatch(addGroup(newGroup));
          }
        });
    
        return () => {
          socket.off('newGroup');
        }; 
      }, [username, socket]);
      
    // update group list 
      useEffect(() => {
        socket.on('groupAddMember', ({ groupId, members }) => {
            console.log("inside socket");
            console.log('groupUpdated useEffect', groupId, members);           
    
            dispatch(selectGroup({
               id: groupId,
                name: selectedGroup?.name,
                creator: selectedGroup?.creator,
                members: members,
                messages: []
            }));
   
            dispatch(updateGroupMembers({ groupId, updatedMembers: members }));
        });

        socket.on('userRemovedFromGroup', () => {
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

    useEffect(() => {
        socket.on('receive_message', (data) => {
            if (data.author.username !== username){
            dispatch(addMessage({ messageData: data, recipient: activeUser }));
            }
        });
        return () => {
          socket.off('receive_message');
        };
      }, [socket, dispatch, activeUser]);

    return <></>
}


export default SocketComponent;