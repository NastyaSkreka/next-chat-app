import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
    author: string;
    id: string;
    text: string;
    time: string;
}

interface Member {
    user: string;
    socketId: string;
    status: string;
}

interface Group {
    id: string;
    name: string;
    creator: string;
    members: Member[];
    messages: Message[];
}

export interface GroupState {
  groups: Group[];
  selectedGroup: Group | null;
}
const initialState: GroupState = {
  groups: [], 
  selectedGroup: null,
};
const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },
    selectGroup: (state, action: PayloadAction<Group>) => {
        state.selectedGroup = action.payload;
    },
    updateGroupMembers: (state, action) => {
        const { groupId, updatedMembers } = action.payload;
        const groupIndex = state.groups.findIndex((group) => group.id === groupId);
  
        if (groupIndex !== -1) {
          const updatedGroup = {
            ...state.groups[groupIndex],
            members: updatedMembers,
          };
  
          state.groups[groupIndex] = updatedGroup;
        }
    },
    updateGroups: (state, action: PayloadAction<Group[]>) => {
        return {
          ...state,
          groups: action.payload,
          selectedGroup: null,
        };
    },
    addMessage: (state, action) => {
        const { groupId, messageData } = action.payload;
        const groupIndex = state.groups.findIndex((group) => group.id === groupId);
  
        if (groupIndex !== -1) {
          const messages = state.groups[groupIndex].messages;
          const newMessages = [...messages, messageData];
          state.groups[groupIndex].messages = newMessages;
        }
    }, 
    deleteGroup: (state, action: PayloadAction<string>) => {
        const groupId = action.payload;
        const newGroups = state.groups.filter((group) => group.id !== groupId);
        state.groups = newGroups;
        state.selectedGroup = null;
    }
} 
});

export const { addGroup, selectGroup,updateGroupMembers,updateGroups, addMessage, deleteGroup} = groupSlice.actions;

export default groupSlice.reducer;





