// Shows trending stories
import { useDispatch } from "react-redux";

import {
  fetchTrendingPosts, // thunk to trigger API request
} from "../features/trendingPosts/trendingPostsSlice";
import { useTrendingPosts } from "../hooks/useTrendingPosts";
import TrendingList from "./TrendingList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useEffect } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useTrendingPosts();

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  return (
    <aside className="p-3 rounded-md bg-[var(--sidebar-bg)]">
      <h2 className="text-lg font-semibold mb-4">Trending</h2>
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage message={error} />}
      {status === "succeeded" && <TrendingList trendingPosts={posts} />}
    </aside>
  );
};

export default Sidebar;
