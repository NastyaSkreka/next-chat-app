"use client";
import { ChangeEventHandler, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Message } from "@/app/redux/features/messages/groupMessagesSlice";
import { deleteMessage, editMessage } from "@/app/redux/features/messages/privateMessageSlice";

interface MessageOptionsProps {
  message: Message;
  username:string | null;
}

const MessageOptions: FC<MessageOptionsProps> = ({ message, username }) => {
    const dispatch = useDispatch();
    console.log(message)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessageText, setNewMessageText] = useState(message.text);

  const [isEditing, setIsEditing] = useState(false);

  const handleNewTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewMessageText(event.target.value);
  };

  const handleEdit = () => {
    dispatch(editMessage({ id: message.id, newText: newMessageText }));
    setIsModalOpen(false);
    setIsEditing(true);
  };

  const handleDelete = () => {
    dispatch(deleteMessage(message.id));
  };

  return (
    <div>
            {message.author === username ? (
        <div
            className="flex flex-row  gap-5 items-center"
            onClick={() => setIsModalOpen(true)}
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
        ) : (
        <div
            className="flex flex-row gap-5 items-center">
            <div
            className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden"
            />
            <div className="bg-gray-300 p-3 rounded-lg">
            <p className="text-lg font-semibold mb-1">{message.author}</p>
            <p className="text-sm">{message.text}</p>
            <p className="text-xs mt-1">{message.time}</p>
            </div>
        </div>
        )}


      {isModalOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black opacity-70"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-black p-5 w-[200px] relative text-white">
            <div className="flex flex-col">
              {isEditing ? (
                <>
                  <input
                    className="bg-black text-white mb-7"
                    value={newMessageText}
                    onChange={handleNewTextChange}
                    placeholder="Type new message"
                  />
                  <div className="flex justify-between">
                    <button className="text-white" onClick={handleEdit}>
                      Edit
                    </button>
                    <button className="text-white" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    className="text-white"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button className="text-white" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageOptions;
