// custom hook
import { useSelector } from "react-redux";
import {
  selectTrendingPosts, // read data from state
  selectTrendingPostsStatus, // read status from state
  selectTrendingPostsError, // read error from state
} from "../features/trendingPosts/trendingPostsSlice";

export function useTrendingPosts() {
  const posts = useSelector(selectTrendingPosts);
  const status = useSelector(selectTrendingPostsStatus);
  const error = useSelector(selectTrendingPostsError);

  return {
    posts,
    status,
    error,
  };
}
