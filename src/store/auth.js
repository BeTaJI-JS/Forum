import { createSlice } from "@reduxjs/toolkit";

const { actions: authActions, reducer: auth } = createSlice({
  initialState: null,
  name: "auth",
  reducers: {
    addAuthUser(_, { payload }) {
      return payload;
    },
    editAuth(state, action) {
      return { ...state, login: action.payload.login, signature: action.payload.signature };
    },
    removeAuth() {
      return null;
    },
  },
});
export const { addAuthUser, editAuth, removeAuth } = authActions;

export default auth;
