"use client"
import { MessagesState, addMessage } from "@/app/redux/features/messages/privateMessageSlice";
import { ConversationState } from "@/app/redux/features/users/conversationSlice";
import MessageOptions from "@/components/message-option";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import SendMessageInput from "./send-message-input";
import { useSocketContext } from "@/providers/socket-provider";

const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

const PrivateContainer: React.FC = () =>  {
    const dispatch = useDispatch();
    const activeUser = useSelector(
        (state: { conversation: ConversationState }) => state.conversation.activeUser,
    );
    const messages = useSelector(
        (state: { private: MessagesState }) => state.private.messages.find((msgObj) => msgObj.userName === activeUser),
    )?.messages || [];

    const { socket } = useSocketContext();
    
    useEffect(() => {
        socket.on('receive_message', (data) => {
            if (data.author !== username){
            dispatch(addMessage({ messageData: data, recipient: activeUser }));
            }
        });
        return () => {
          socket.off('receive_message');
        };
      }, [socket, dispatch, activeUser]);
    
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-row items-center h-[50px] px-10 bg-zinc-900 w-full">
        <p className="text-white flex-1">Message</p>
      </div>
      <div className="bg-zinc-500 h-full p-4 flex flex-col justify-between w-full">
      <div className="flex flex-grow flex-col justify-end py-7 space-y-5">
    
      {messages.map((message) => (
            <div key={message.id}>
              <MessageOptions message={message} username={activeUser}/>
            </div>
        ))}

        </div>
        <SendMessageInput socket={socket} />
      </div>
    </div>
  );
}

export default PrivateContainer;
