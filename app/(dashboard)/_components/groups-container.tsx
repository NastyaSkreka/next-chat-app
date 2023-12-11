"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageOptions from "@/components/message-option";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocketContext } from "@/providers/socket-provider";
import { GroupState, addMessage } from "@/app/redux/features/users/groupSlice";
import { RootState } from "@/app/redux/store";


function GroupsContainer() {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const [newMessageText, setNewMessageText] = useState("");
  const selectedGroup = useSelector(
    (state: RootState) => state.groups.selectedGroup
  );

  console.log("selectedGroup", selectedGroup)
  const messages = useSelector((state: RootState) =>
    state.groups.groups.find((group) => group.id === selectedGroup?.id)
  )?.messages;

  
    useEffect(() => {
        socket.on("groupMessage", ({ messageData, groupId }) => {
        console.log("inside socket groupMessage");
        console.log("messageData", messageData);
        dispatch(addMessage({ messageData, groupId }));
        });
        return () => {
        socket.off("groupMessage");
        };
    }, [socket, dispatch]); 


  const author = {
    username: localStorage.getItem("username"), 
    socketId: socket.id, 
  }; 
  

  const handleAddMessage = () => {
    if (newMessageText) {
      const messageData = {
        author,
        text: newMessageText,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      console.log("messageData", messageData)

      const groupId = selectedGroup?.id as string;

      const params = { messageData, groupId };

      socket.emit("sendMessageToGroup", params);

      setNewMessageText("");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-row items-center h-[50px] px-10 bg-zinc-900 w-full">
        <p className="text-white flex-1">Message</p>
      </div>
      <div className="bg-zinc-600  h-full p-4 flex flex-col justify-between w-full shadow-2xl">
    {
        selectedGroup && (
            <div className="flex flex-grow flex-col justify-end py-7 space-y-5">
            {messages?.map((message) => (
              <div key={message.id}>
                {
                
                    <MessageOptions
                    username={localStorage.getItem("username" || "")}
                    message={message}
                />
                       
                }
              </div>
            ))}
          </div>
        )
    }
               
        {selectedGroup && (
          <div className="mt-auto flex gap-2">
            <Input
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder="type message..."
            />
            <Button onClick={handleAddMessage}>Send</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupsContainer;
