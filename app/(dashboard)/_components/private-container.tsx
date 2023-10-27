"use client"
import { MessagesState, addMessage } from "@/app/redux/features/messages/privateMessageSlice";
import MessageOptions from "@/components/message-option";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const username = localStorage.getItem('username');

interface PrivateContainerProps {
    socket: Socket;
  }

const PrivateContainer: React.FC<PrivateContainerProps> = ({ socket }) =>  {

    const dispatch = useDispatch();
    const messages = useSelector(
        (state: { private: MessagesState }) => state.private.messages,
      ); 
    
    const [newMessageText, setNewMessageText] = useState("");
    const messageId = uuidv4();

    const handleAddMessage =  () => {
        if (!newMessageText) return; 
          const messageData = {
                id: messageId, 
                author: username, 
                text: newMessageText, 
                time: 
                    new Date(Date.now()).getHours() + 
                    ":" + 
                    new Date(Date.now()).getMinutes(), 
          }
         
        dispatch(addMessage(messageData));
        socket.emit("send_message",messageData );
        setNewMessageText("");        
    };

    useEffect(() => {
        const handleReceiveMessage = (data:any) => {
          if (data.author !== username) {
            dispatch(addMessage(data));
          }
        };      
        socket.on('receive_message', handleReceiveMessage);
        return () => {
          socket.off('receive_message', handleReceiveMessage);
        };
      }, [socket, dispatch, username]);

      
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-row items-center h-[50px] px-10 bg-zinc-900 w-full">
        <p className="text-white flex-1">Message</p>
      </div>
      <div className="bg-zinc-500 h-full p-4 flex flex-col justify-between w-full">
      <div className="flex flex-grow flex-col justify-end py-7 space-y-5">
    
      {messages.map((message) => (
            <div key={message.id}>
              <MessageOptions message={message} username={username}/>
            </div>
          ))}
        </div>

        <div className="mt-auto flex gap-2">
          <Input
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="type message..."
          />
          <Button onClick={handleAddMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}

export default PrivateContainer;
