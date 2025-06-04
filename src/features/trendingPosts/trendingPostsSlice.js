// Handles async state
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// async thunk here
export const fetchTrendingPosts = createAsyncThunk(
  "posts/trendingPosts",
  async () => {
    const response = await fetch(
      "https://hn.algolia.com/api/v1/search?tags=story&numericFilters=points>100"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.hits;
  }
);

// slice here
const trendingPostsSlice = createSlice({
  name: "trendingPosts",
  initialState: {
    items: [], // holds trending posts array following successful fetch
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null, // holds error message if fetch fails
  },
  reducers: {},
  // handles the thunk lifecycle
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrendingPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTrendingPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// trending posts determined by 1. field - points i.e., nuber of upvotes
// 2. field - created_at i.e., post date, for recency
// note to self: Slice name ➔ State key ➔ Selector path

// selects items from trendingPosts slice
export const selectTrendingPosts = (state) => state.trendingPosts.items;
// Select loading status ("idle" | "loading" | "succeeded" | "failed") for async fetch
export const selectTrendingPostsStatus = (state) => state.trendingPosts.status;
// Select error message  from async fetch failure
export const selectTrendingPostsError = (state) => state.trendingPosts.error;

export default trendingPostsSlice.reducer;
