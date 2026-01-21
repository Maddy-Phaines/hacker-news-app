// Shows trending stories
import { useDispatch } from "react-redux";
import { LucideTrendingUp } from "lucide-react";
import {
  fetchTrendingPosts, // thunk to trigger API request
} from "../features/trendingPosts/trendingPostsSlice";
import { useTrendingPosts } from "../hooks/useTrendingPosts";
import TrendingList from "./TrendingList";
import useNProgress from "../hooks/useNProgress";
import ErrorMessage from "./ErrorMessage";
import { useEffect } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useTrendingPosts();

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);
  /* re: dark/default mode, Card, Sidebar, Header, Footer → specific backgrounds

Button, Link, Alert → specific text/background/border */
  return (
    <aside
      className="p-3  border-t border-[var(--border-top-width)] 
    border-[var(--color-border)]"
    >
      <div className="mt-[var(--margin-sm)] mb-[var(--margin-xs)]">
        <div className="flex items-center text-[var(--color-text-neutral)]">
          <LucideTrendingUp className="mr-1" />
          <h2 className="text-[14px] font-semibold">TRENDING TODAY</h2>
        </div>
      </div>
      {useNProgress(status === "loading")}
      {status === "failed" && <ErrorMessage message={error} />}
      {status === "succeeded" && <TrendingList trendingPosts={posts} />}
    </aside>
  );
};

export default Sidebar;
