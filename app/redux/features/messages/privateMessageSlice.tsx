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
        // const userMessages = state.messages.filter((messageObj) => messageObj.userName === action.payload.recipient);
        const findIndex = state.messages.findIndex((obj) => obj.userName === action.payload.recipient);
        console.log(findIndex);
        if(findIndex < 0) return;
        const msgs = state.messages[findIndex]?.messages || [];
        if(!msgs) return;

        const updatedMessages = {userName:action.payload.recipient, messages:  [...msgs, action.payload.messageData]};

        const newMessages = [ ...state.messages, updatedMessages ];
        return {
            ...state,
            messages: newMessages
        }
      },
      
    editMessage: (state, action) => {
        const messages = state.messages.find((message) => message.userName === action.payload.activeUser)?.messages;
        const messageToEdit = messages?.find((message) => message.id === action.payload.id);
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
