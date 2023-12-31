import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Message {
author: string;
  id: string;
  text: string;
  time: string;
}

export interface MessagesState {
  messages: Message[];
}

export const initialState: MessagesState = {
  messages: [],
};

const groupMessagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
   /* addMessage: (state, action) => {
      const newMessage = {
        id: uuidv4(),
        text: action.payload,
      };
      state.messages.push(newMessage);
    }, */
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
export const { editMessage, deleteMessage, } = groupMessagesSlice.actions;

export default groupMessagesSlice.reducer;
