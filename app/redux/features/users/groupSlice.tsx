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
    
  },
});

export const { addGroup, selectGroup } = groupSlice.actions;

export default groupSlice.reducer;





