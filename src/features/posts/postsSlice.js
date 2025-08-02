/* PostsSlice handles async fetch with createAsyncThunk*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// The thunk takes a `tag` argument
export const fetchPostsByTag = createAsyncThunk(
  "posts/fetchPosts",
  async (tag) => {
    const dateTags = ["ask_hn", "show_hn", "poll"];
    const base = dateTags.includes(tag)
      ? "https://hn.algolia.com/api/v1/search_by_date"
      : "https://hn.algolia.com/api/v1/search";

    // limit to 30 results per tab
    const url = `${base}?tags=${tag}&hitsPerPage=30`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const posts = data.hits.map((hit) => ({
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

    return {
      tag: tag,
      posts: posts,
    };
  }
);

// Define the list of all tags/tabs in one place
export const ALL_TAGS = ["front_page", "best", "ask_hn", "show_hn", "poll"];

export const initialState = {
  byTag: ALL_TAGS.reduce((map, tag) => {
    map[tag] = {
      items: [],
      status: "idle",
      error: null,
    };
    return map;
  }, {}),
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // reset state
    resetTag() {
      const tag = action.payload;
      if (state.byTag[tag]) {
        state.byTag[tag] = { items: [], status: "idle", error: null };
      }
    },
    resetAll(state) {
      Object.keys(state.byTag).forEach((t) => {
        state.byTag[t] = { items: [], status: "idle", error: null };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByTag.pending, (state, action) => {
        const tag = action.meta.arg;
        state.byTag[tag].status = "loading";
        state.byTag[tag].error = null;
      })
      .addCase(fetchPostsByTag.fulfilled, (state, action) => {
        const { tag, posts } = action.payload;
        state.byTag[tag].status = "succeeded";
        state.byTag[tag].items = posts; // ← assign the fetched array
      })
      .addCase(fetchPostsByTag.rejected, (state, action) => {
        const tag = action.meta.arg;
        state.byTag[tag].status = "failed"; // ← set the status
        state.byTag[tag].error = action.error.message; // ← set the error
      });
  },
});

export const { resetTag, resetAll } = postsSlice.actions;

// Select all posts data from Redux state
export const selectPostsByTag = (state, tag) =>
  state.posts.byTag[tag]?.items ?? [];
// Select loading status ("idle" | "loading" | "succeeded" | "failed") for async fetch
export const selectPostsStatusByTag = (state, tag) =>
  state.posts.byTag[tag]?.status ?? "idle";
// Select error message  from async fetch failure
export const selectPostsErrorByTag = (state, tag) =>
  state.posts.byTag[tag]?.error;

export default postsSlice.reducer;
