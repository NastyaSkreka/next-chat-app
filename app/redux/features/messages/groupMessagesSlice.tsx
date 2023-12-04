import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Message {
author: string;
  id: string;
  text: string;
  time: string;
}

export interface MessagesState {
    messages: { userName: string; messages: Message[] }[];
  }
  
  export const initialState: MessagesState = {
    messages: [],
  };
  

const groupMessagesSlice = createSlice({
  name: "messages",
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
      state.messages = state.messages.filter(
        (message) => message.id !== idToDelete,
      );
    },
  },
});
export const { editMessage, deleteMessage,  addMessage } = groupMessagesSlice.actions;

export default groupMessagesSlice.reducer;
