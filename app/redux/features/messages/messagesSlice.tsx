import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  text: string;
}

interface MessagesState {
  messages: Message[];
}

const initialState: MessagesState = {
  messages: [],
};

export const addMessage = createAsyncThunk('messages/addMessage', async (text: string) => {
  const newMessage: Message = {
    id: uuidv4(),
    text,
  };
  return newMessage;
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    editMessage: (state, action) => {
      const { id, newText } = action.payload;
      const messageToEdit = state.messages.find((message) => message.id === id);
      if (messageToEdit) {
        messageToEdit.text = newText;
      }
    },
    deleteMessage: (state, action) => {
      const idToDelete = action.payload;
      state.messages = state.messages.filter((message) => message.id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.messages.push(action.payload);
    });
  },
});

export const { editMessage, deleteMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
