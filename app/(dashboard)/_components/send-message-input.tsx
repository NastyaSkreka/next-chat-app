'use client';

import { addMessage } from '@/app/redux/features/messages/privateMessageSlice';
import { ConversationState } from '@/app/redux/features/users/conversationSlice';
import { RootState } from '@/app/redux/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';


interface SendMessageInputProps {
    socket: Socket;
};

const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;

function SendMessageInput({ socket }: SendMessageInputProps) {
    const [newMessageText, setNewMessageText] = useState("");
    const messageId = uuidv4();

    const dispatch = useDispatch();
    const activeUser = useSelector(
        (state: { conversation: ConversationState }) => state.conversation.activeUser,
    );

    const messages = useSelector((state: RootState) => state.private.messages).find((messageObj) => messageObj.userName === activeUser)?.messages || [];

    const handleAddMessage =  () => {
        if (!newMessageText) return;
        console.log("Sedning Message");
          const messageData = {
                id: messageId, 
                author: username,
                text: newMessageText, 
                time: 
                    new Date(Date.now()).getHours() + 
                    ":" + 
                    new Date(Date.now()).getMinutes(), 
          }
         
        dispatch(addMessage({messageData, recipient: activeUser }));
        console.log(messages);
        socket.emit("send_message",messageData );
        setNewMessageText("");        
    };
  return (
    <div className="mt-auto flex gap-2">
        <Input
        value={newMessageText}
        onChange={(e) => setNewMessageText(e.target.value)}
        placeholder="type message..."
        />
        <Button onClick={handleAddMessage}>Send</Button>
    </div>
  )
}

export default SendMessageInput;
