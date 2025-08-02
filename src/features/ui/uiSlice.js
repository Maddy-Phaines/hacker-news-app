// uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTag: "front_page",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTab(state, action) {
      state.currentTag = action.payload;
    },
  },
});

export const { setTab } = uiSlice.actions;

// <-- add this:
export const selectCurrentTag = (state) => state.ui.currentTag;

export default uiSlice.reducer;
