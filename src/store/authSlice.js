import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    auth(state, { payload }) {
      return (state = payload);
    },
    removeAuth() {
      return null;
    },
    editAuth(state, action) {
      // console.log("action", action);
      // const editItem = state.find((el) => el.id === action.payload.id);
      // console.log("user EDIT ==== >", editItem);
      // if (editItem) {
      state.signature = action.payload.signature;
      state.login = action.payload.login;
      // state.avatar = action.payload.avatar;
      // }
      return state;
    },
  },
});
export const { auth, removeAuth, editAuth } = authSlice.actions;

export default authSlice.reducer;
