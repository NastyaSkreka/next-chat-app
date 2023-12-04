"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessagesState } from "@/app/redux/features/messages/groupMessagesSlice";
import MessageOptions from "@/components/message-option";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocketContext } from "@/providers/socket-provider";
import { GroupState, addMessage } from "@/app/redux/features/users/groupSlice";
import { RootState } from "@/app/redux/store";

const username =
  typeof localStorage !== "undefined" ? localStorage.getItem("username") : null;

function GroupsContainer() {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const [newMessageText, setNewMessageText] = useState("");
  const selectedGroup = useSelector(
    (state: RootState) => state.groups.selectedGroup
  );
  const messages = useSelector((state: RootState) =>
    state.groups.groups.find((group) => group.id === selectedGroup?.id)
  )?.messages;

  //   const messages = useSelector(
  //     (state: { group: MessagesState }) => state.group.messages,
  //   );

  const groups = useSelector(
    (state: { groups: GroupState }) => state.groups.groups
  );

  console.log("selectedGroup", selectedGroup);
  console.log("group", groups);

  useEffect(() => {
    socket.on("groupMessage", ({ messageData, groupId }) => {
      console.log("inside socket groupMessage");
      console.log("messageData", messageData);
      // if (messageData.author !== username){
      dispatch(addMessage({ messageData, groupId }));
      // }
    });
    return () => {
      socket.off("groupMessage");
    };
  }, [socket, dispatch]);

  const author = {
    username: localStorage.getItem("username"), // Получаем username из локального хранилища
    socketId: socket.id, // Получаем сокет-идентификатор
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

      const groupId = selectedGroup?.id as string;

      const params = { messageData, groupId };

      socket.emit("sendMessageToGroup", params);

      console.log("send sendMessageToGroup to server");

      //   dispatch(addMessage(params));

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
          {messages?.map((message) => (
            <div key={message.id}>
              <MessageOptions
                username={localStorage.getItem("username") || ""}
                message={message}
              />
            </div>
          ))}
        </div>
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
