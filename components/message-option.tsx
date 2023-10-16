"use client";
import { ChangeEventHandler, FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editMessage,
  deleteMessage,
} from "@/app/redux/features/messages/messagesSlice";
import { Message } from "@/app/redux/features/messages/messagesSlice";

interface MessageOptionsProps {
  message: Message;
}

const MessageOptions: FC<MessageOptionsProps> = ({ message }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessageText, setNewMessageText] = useState(message.text);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    dispatch(editMessage({ id: message.id, newText: newMessageText }));
    setIsModalOpen(false);
    setIsEditing(true);
  };

  const handleNewTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewMessageText(event.target.value);
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteMessage(message.id));
  };

  return (
    <div>
      <div
        className="flex flex-row gap-5 items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="w-16 h-16 bg-zinc-300 rounded-full overflow-hidden" />
        <div>
          <p className="text-lg font-semibold text-white mb-1">Name</p>
          <p className="text-sm text-gray-400">{message.text}</p>
        </div>
      </div>

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
