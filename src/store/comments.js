import { createSlice } from "@reduxjs/toolkit";

const { reducer: comments, actions: commentsActions } = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    addComment(state, action) {
      state.push(action.payload);
    },
    editComment(state, action) {
      const editItem = state.find((el) => el.id === action.payload.id);

      Object.keys(action.payload).forEach((key) => {
        if (key !== "id") {
          editItem[key] = action.payload[key];
        }
      });
    },
    deleteComment(state, action) {
      return (state = state.filter((el) => el.id !== action.payload.id));
    },
  },
});

export const { addComment, editComment, deleteComment } = commentsActions;

export default comments;
