import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import trendingPostsReducer from "../features/trendingPosts/trendingPostsSlice";
import searchReducer from "../features/search/searchSlice";
import postDetailReducer from "../features/postDetail/postDetailSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    trendingPosts: trendingPostsReducer,
    search: searchReducer,
    postDetail: postDetailReducer,
    ui: uiReducer,
  },
});
