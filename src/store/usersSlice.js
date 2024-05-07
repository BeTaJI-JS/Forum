import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUser(state, action) {
      state = state.push(action.payload);
    },
    removeUsers() {
      return [];
    },
    editUser(state, action) {
      const editItem = state.find((el) => el.id === action.payload.id);

      if (editItem) {
        editItem.signature = action.payload.signature;
        editItem.login = action.payload.login;
      }
    },
  },
});
export const { setUser, removeUsers, editUser } = usersSlice.actions;

export default usersSlice.reducer;
