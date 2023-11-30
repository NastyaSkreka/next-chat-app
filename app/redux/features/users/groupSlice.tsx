import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Group {
    id: string;
    name: string;
    creator: string;
    members: Array<Member>;
  }

interface Member {
    user: string;
    socketId: string;
    status: string;
}

export interface GroupState {
  groups: Group[];
  selectedGroup: string | null;
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
    selectGroup: (state, action: PayloadAction<string | null>) => {
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
} 
});

export const { addGroup, selectGroup,updateGroupMembers,updateGroups} = groupSlice.actions;

export default groupSlice.reducer;





