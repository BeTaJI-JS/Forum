import { createSlice, current } from "@reduxjs/toolkit";
// import { forums } from "../data/tree";

const { reducer: forumsReducer, actions: forumsSliceActions } = createSlice({
  name: "forums",
  initialState: [],
  reducers: {
    addItem(state, action) {
      console.log(" forums Slice action.payload--->", action.payload);
      state.push(action.payload);
    },
    editItem(state, action) {
      console.log("actionpayload EDIT", action.payload);
      const editItem = state.find((el) => el.id === action.payload.id);

      Object.keys(action.payload).forEach((key) => {
        if (key !== "id") {
          editItem[key] = action.payload[key];
        }
      });
      console.log("editItem EDITED!!!!--->", current(editItem));
      // if (editItem) {
      //   editItem.title = action.payload.title;
      //   editItem.text = action.payload.text;
      // }
    },
  },
});

export const { addItem, editItem } = forumsSliceActions;

export default forumsReducer;
