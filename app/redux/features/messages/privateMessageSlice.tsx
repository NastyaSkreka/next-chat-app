import { createSlice } from "@reduxjs/toolkit";

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

const privateMessagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
        const findIndex = state.messages.findIndex((obj) => obj.userName === action.payload.recipient);
        if(findIndex < 0) {
          const newMessage = {
            userName: action.payload.recipient,
            messages: [action.payload.messageData]
          }
          state.messages.push(newMessage);
          return state;
        };
        state.messages[findIndex].messages.push(action.payload.messageData);
        return state;
    },
    editMessage: (state, action) => {
        const messages = state.messages.find((message) => message.userName === action.payload.activeUser)?.messages;
        const messageToEdit = messages?.find((message) => message.id === action.payload.id);
        if (messageToEdit) {
          messageToEdit.text = action.payload.newText;
        }
    },
    deleteMessage: (state, action) => {     
      const messages = state.messages.find((msgObj) => msgObj.userName === action.payload.recipient)?.messages;
      if(!messages?.length) return;
     
      messages.filter((msg) => msg.id === action.payload.msgId);
      return state;
    },
  },
});
export const { editMessage, deleteMessage, addMessage } = privateMessagesSlice.actions;

export default privateMessagesSlice.reducer;
