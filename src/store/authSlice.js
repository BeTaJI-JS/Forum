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
      state.signature = action.payload.signature;
      state.login = action.payload.login;

      return state;
    },
  },
});
export const { auth, removeAuth, editAuth } = authSlice.actions;

export default authSlice.reducer;
