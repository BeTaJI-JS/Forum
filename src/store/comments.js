import { createSlice, current } from "@reduxjs/toolkit";

const { reducer: comments, actions: commentsActions } = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    addComment(state, action) {
      console.log("action addComment", action);
      state.push(action.payload);
    },
    editComment(state, action) {
      const editItem = state.find((el) => el.id === action.payload.id);
      console.log("current editComment==>", current(editItem));
      Object.keys(action.payload).forEach((key) => {
        if (key !== "id") {
          editItem[key] = action.payload[key];
        }
      });
    },
    deleteComment(state, action) {
      console.log("delete payload", action.payload);
      console.log("state comments===>", current(state));
      return (state = state.filter((el) => el.id !== action.payload.id));
    },
  },
});

export const { addComment, editComment, deleteComment } = commentsActions;

export default comments;
