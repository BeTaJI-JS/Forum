import { createSlice } from "@reduxjs/toolkit";

const { actions: commentsActions, reducer: comments } = createSlice({
  initialState: [],
  name: "comments",
  reducers: {
    addComment(state, action) {
      state.push(action.payload);
    },
    deleteComment(state, action) {
      return state.filter((el) => el.id !== action.payload.id);
    },
    editComment(state, action) {
      const editItem = state.find((el) => el.id === action.payload.id);

      Object.keys(action.payload).forEach((key) => {
        if (key !== "id") {
          editItem[key] = action.payload[key];
        }
      });
    },
  },
});

export const { addComment, deleteComment, editComment } = commentsActions;

export default comments;
