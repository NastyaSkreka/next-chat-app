import { createSlice } from "@reduxjs/toolkit";

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

const privateMessagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      },
      
    editMessage: (state, action) => {
        const messageToEdit = state.messages.find((message) => message.id === action.payload.id);
        if (messageToEdit) {
          messageToEdit.text = action.payload.newText;
        }
    },
    deleteMessage: (state, action) => {
        state.messages = state.messages.filter((message) => message.id !== action.payload);
      },
  },
});
export const { editMessage, deleteMessage, addMessage } = privateMessagesSlice.actions;

export default privateMessagesSlice.reducer;
