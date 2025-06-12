// Handles async state
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// async thunk here
export const fetchTrendingPosts = createAsyncThunk(
  "posts/trendingPosts",
  async () => {
    // 1) Calculate the cutoff timestamp (seconds since the epoch)
    const oneDayAgo = Math.floor(Date.now() / 1000) - 24 * 60 * 60;

    // filter string
    const filters = `points>100,created_at_i>${oneDayAgo}`;

    // constructs the full URL, encoding the filters portion
    const url =
      `https://hn.algolia.com/api/v1/search_by_date?` +
      `tags=story&` +
      `numericFilters=${encodeURIComponent(filters)}&` +
      `hitsPerPage=5`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch trending posts");
    }

    const data = await response.json();
    return data.hits;
  }
);

export const initialTrendingState = {
  items: [], // holds trending posts array following successful fetch
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null, // holds error message if fetch fails
};

// slice here
const trendingPostsSlice = createSlice({
  name: "trendingPosts",
  initialState: initialTrendingState,
  reducers: {
    resetTrending() {
      return initialTrendingState;
    },
  },
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

export const { resetTrending } = trendingPostsSlice.actions;

export default trendingPostsSlice.reducer;
