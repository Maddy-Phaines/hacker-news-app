/* PostsSlice handles async fetch with createAsyncThunk*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=front_page"
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.hits;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Select all posts data from Redux state
export const selectPosts = (state) => state.posts.items;
// Select loading status ("idle" | "loading" | "succeeded" | "failed") for async fetch
export const selectPostsStatus = (state) => state.posts.status;
// Select error message  from async fetch failure
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
