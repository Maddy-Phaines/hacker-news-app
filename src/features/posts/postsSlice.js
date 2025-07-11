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
  console.log(data.hits);

  return data.hits.map((hit) => ({
    objectID: hit.objectID,
    title: hit.title,
    url: hit.url,
    author: hit.author,
    points: hit.points,
    num_comments: hit.num_comments,
    created_at: hit.created_at,
    story_text: hit.story_text,
    _highlightResult: hit._highlightResult,
  }));
});

export const initialPostState = {
  items: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  reducers: {
    // reset state
    resetPosts() {
      return initialPostState;
    },
  },
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

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
