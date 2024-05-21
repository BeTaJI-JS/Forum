import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  initialState: [],
  name: "users",
  reducers: {
    editUser(state, action) {
      const editItem = state.find((el) => el.id === action.payload.id);

      if (editItem) {
        editItem.signature = action.payload.signature;
        editItem.login = action.payload.login;
      }
    },
    removeUsers() {
      return [];
    },
    setUser(state, action) {
      state.push(action.payload);
    },
  },
});
export const { editUser, removeUsers, setUser } = usersSlice.actions;

export default usersSlice.reducer;
