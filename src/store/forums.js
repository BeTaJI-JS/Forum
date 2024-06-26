import { createSlice } from "@reduxjs/toolkit";

const { actions: forumsSliceActions, reducer: forumsReducer } = createSlice({
  initialState: [],
  name: "forums",
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
    editItem(state, action) {
      const editItem = state.find((el) => el.id === action.payload.id);

      Object.keys(action.payload).forEach((key) => {
        if (key !== "id") {
          editItem[key] = action.payload[key];
        }
      });
    },
  },
});

export const { addItem, editItem } = forumsSliceActions;

export default forumsReducer;
