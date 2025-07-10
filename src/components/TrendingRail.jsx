// components/TrendingRail.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LucideTrendingUp } from "lucide-react";
import { fetchTrendingPosts } from "../features/trendingPosts/trendingPostsSlice";
import { useTrendingPosts } from "../hooks/useTrendingPosts";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import TrendingList from "./TrendingList";
import Sidebar from "./Sidebar";

const TrendingRail = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useTrendingPosts();

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  return (
    <Sidebar>
      <div className="mb-2 flex items-center text-[var(--color-text-neutral)]">
        <LucideTrendingUp className="mr-1" />
        <h2 className="text-[14px] font-semibold">TRENDING TODAY</h2>
      </div>

      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage message={error} />}
      {status === "succeeded" && <TrendingList trendingPosts={posts} />}
    </Sidebar>
  );
};

export default TrendingRail;
