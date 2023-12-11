import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    user: string;
    socketId: string;
    status: string;
}
export interface ConversationState {
  activeUser: string | null;
  sidebarData: User[]; 
}

const initialState: ConversationState = {
  activeUser: null,
  sidebarData: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<string | null>) => {
      state.activeUser = action.payload;
    },
    setSidebarData: (state, action: PayloadAction<User[]>) => {
      state.sidebarData = action.payload;
    },
  },
});

export const { setActiveUser, setSidebarData } = conversationSlice.actions;

export default conversationSlice.reducer;
