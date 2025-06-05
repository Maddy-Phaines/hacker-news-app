import {
  selectPosts,
  selectPostsStatus,
  selectPostsError,
} from "../features/posts/postsSlice";
import { useSelector } from "react-redux";

export const usePosts = () => {
  const posts = useSelector(selectPosts);
  // Select current loading status ("idle" | "loading" | "succeeded" | "failed") from the store
  const status = useSelector(selectPostsStatus);
  // Select error message from the store
  const error = useSelector(selectPostsError);
  return {
    posts,
    status,
    error,
  };
};
