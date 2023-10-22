"use client"
import { MessagesState, addMessage } from "@/app/redux/features/messages/privateMessageSlice";
import MessageOptions from "@/components/message-option";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from 'socket.io-client';

const username = localStorage.getItem('username');

const socketServer = io("http://localhost:3001");

interface PrivateContainerProps {
    socket: Socket;
  }

const PrivateContainer: React.FC<PrivateContainerProps> = ({ socket }) =>  {

    const dispatch = useDispatch();
    const messages = useSelector(
        (state: { private: MessagesState }) => state.private.messages,
      );
    
    const [newMessageText, setNewMessageText] = useState("");

    const handleAddMessage =  () => {
        if (!newMessageText) return; 
          const messageData = {
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
