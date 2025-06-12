import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import trendingPostsReducer from "../features/trendingPosts/trendingPostsSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    trendingPosts: trendingPostsReducer,
    search: searchReducer,
  },
});
