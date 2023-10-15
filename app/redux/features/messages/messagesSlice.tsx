'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: number;
  text: string;
}

const initialState: Message[] = [];

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    editMessage: (state, action: PayloadAction<{ id: number; newText: string }>) => {
      const { id, newText } = action.payload;
      const messageToEdit = state.find((message) => message.id === id);
      if (messageToEdit) {
        messageToEdit.text = newText;
      }
    },
    deleteMessage: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      return state.filter((message) => message.id !== idToDelete);
    },
  },
});

export const { editMessage, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;
