"use client";
import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, deleteMessage, editMessage } from "@/app/redux/features/messages/privateMessageSlice";
import { RootState } from "@/app/redux/store";


interface MessageOptionsProps {
    message: Message;
    username:any
}

const MessageOptions: FC<MessageOptionsProps> = ({ message, username  }) => {
    console.log("MessageOptions", message)
  
  return (
    <div>
            {message.author.username !== username ? (  
                <div
                className="flex flex-row gap-5 items-center">
                <div
                className="w-16 h-16 bg-zinc-500  rounded-full overflow-hidden"
                />
                <div className="bg-gray-400 p-3 rounded-lg">
                <p className="text-lg font-semibold mb-1">{message.author.username}</p>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1">{message.time}</p>
                </div>
            </div>
        ) : (
            <div
                 className="flex flex-row  gap-5 items-center"
                 >
                 <div
                 className="w-16 h-16 bg-zinc-800 rounded-full overflow-hidden"
                 />
                 <div className="bg-neutral-400 px-5 py-1 rounded-lg text-white">
                 <p className="text-lg font-semibold mb-1">You</p>
                 <p className="text-sm">{message.text}</p>
                 <p className="text-xs mt-1">{message.time}</p>
                 </div>
                 </div>
        )}

    </div>
  );
};

export default MessageOptions;
