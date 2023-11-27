"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessagesState,
  addMessage,
} from "@/app/redux/features/messages/groupMessagesSlice";
import MessageOptions from "@/components/message-option";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function GroupsContainer() {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state: { groups: { selectedGroup: string | null } }) => state.groups.selectedGroup);
  const messages = useSelector(
    (state: { group: MessagesState }) => state.group.messages,
  );

  const [newMessageText, setNewMessageText] = useState("");

  const handleAddMessage = () => {
    if (newMessageText) {
      dispatch(addMessage(newMessageText));
      setNewMessageText("");
    }
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
              <MessageOptions username={localStorage.getItem('username') || ''} message={message} />
            </div>
          ))}
        </div>
        {
            selectedGroup && (
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
      </div>
    </div>
  );
}

export default GroupsContainer;
