import { createSlice } from "@reduxjs/toolkit";
// import { forums } from "../data/tree";

const { reducer: forumsReducer, actions: forumsSliceActions } = createSlice({
  name: "forums",
  initialState: [],
  reducers: {
    addItem(state, action) {
      console.log(" forums Slice action.payload--->", action.payload);
      state.push(action.payload);
    },
  },
});

export const { addItem } = forumsSliceActions;

export default forumsReducer;
