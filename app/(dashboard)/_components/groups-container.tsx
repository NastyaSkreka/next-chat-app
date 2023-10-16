"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import {  Message, MessagesState, addMessage } from '@/app/redux/features/messages/messagesSlice';
import MessageOptions from '@/components/message-option';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


function GroupsContainer(){
    const dispatch = useDispatch();
    const messages = useSelector((state: { messages: MessagesState }) => state.messages.messages);

    const [selectedMessage, setSelectedMessage] = useState(null)
    const [newMessageText, setNewMessageText] = useState('')

    const handleAddMessage = () => {
        if (newMessageText) {
        dispatch(addMessage(newMessageText));
          setNewMessageText('');
        }
      };
      
      const handleEdit = (newText: string, messageId: number) => {
        
      };
    
      const handleDelete = (messageId: number) => {
       
      };

    return (
        <div className='flex flex-col flex-1 w-full'>
        <div className='flex flex-row items-center h-[50px] px-10 bg-zinc-900 w-full'>
          <p className='text-white flex-1'>Message</p>
        </div>
        <div className='bg-zinc-500 h-full p-4 flex flex-col justify-between w-full'>
          <div className="flex flex-grow flex-col justify-end py-7 space-y-5">
                <div className='flex flex-row gap-5 items-center'>
                  <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden"/>
                  <div>
                      <p className='text-lg font-semibold text-white mb-1'>Name</p>
                      <p className='text-sm text-gray-400'>Message</p>
                  </div>    
              </div>
              <div className='flex flex-row gap-5 items-center'>
                  <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden"/>
                  <div>
                      <p className='text-lg font-semibold text-white mb-1'>Name</p>
                      <p className='text-sm text-gray-400'>Message</p>
                  </div> 
              </div>
             {
                messages.map((message) => (
                    <div key={message.id}>
                        <MessageOptions message={message} />
                    </div>
                ))
             }
               {selectedMessage && (
                    <div>Choose</div>
                )}
             
          </div>
                 <div className="mt-auto flex gap-2">
            <Input 
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder='type message...'
            />
            <Button onClick={handleAddMessage}>Send</Button>
          </div>
        </div>
      </div>
    )
}

export default GroupsContainer;