"use client"
import { MessagesState, addMessage } from "@/app/redux/features/messages/privateMessageSlice";
import { ConversationState } from "@/app/redux/features/users/conversationSlice";
import MessageOptions from "@/components/message-option";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import SendMessageInput from "./send-message-input";


interface PrivateContainerProps {
    socket: Socket;
  }

const PrivateContainer: React.FC<PrivateContainerProps> = ({ socket }) =>  {

    const dispatch = useDispatch();
    const activeUser = useSelector(
        (state: { conversation: ConversationState }) => state.conversation.activeUser,
    );
    const messages = useSelector(
        (state: { private: MessagesState }) => state.private.messages.find((msgObj) => msgObj.userName === activeUser),
    )?.messages || [];
    
    

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log("Inside receive_message ",data);
            dispatch(addMessage({ messageData: data, recipient: activeUser }));
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
            {/* {message.text} */}
            </div>
        ))}

        </div>
        <SendMessageInput socket={socket} />
      </div>
    </div>
  );
}

export default PrivateContainer;
