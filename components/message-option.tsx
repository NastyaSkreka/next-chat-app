import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { editMessage, deleteMessage } from '@/app/redux/features/messages/messagesSlice';
import { Message } from '@/app/redux/features/messages/messagesSlice'; 

interface MessageOptionsProps {
  message: Message;
}

const MessageOptions: FC<MessageOptionsProps> = ({ message }) => {
  const dispatch = useDispatch();

  const handleEdit = (newText: string) => {
    dispatch(editMessage({ id: message.id, newText }));
  };

  const handleDelete = () => {
    dispatch(deleteMessage(message.id));
  };

  return (
    <div>
      <button onClick={() => handleEdit('Новый текст сообщения')}>Редактировать</button>
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default MessageOptions;
