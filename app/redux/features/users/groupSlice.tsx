import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Group {
  id: string;
  name: string;
  creator: string;
  members: string[];
}
interface GroupState {
  groups: Group[];
}
const initialState: GroupState = {
  groups: [], 
};
const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
        console.log("state.groups", state.groups)
      state.groups.push(action.payload);
      console.log(state.groups)
    },
  },
});

export const { addGroup } = groupSlice.actions;

export default groupSlice.reducer;
