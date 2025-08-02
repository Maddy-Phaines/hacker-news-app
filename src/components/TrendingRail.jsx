import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LucideTrendingUp } from "lucide-react";
import { fetchTrendingPosts } from "../features/trendingPosts/trendingPostsSlice";
import { useTrendingPosts } from "../hooks/useTrendingPosts";
import useNProgress from "../hooks/useNProgress";
import ErrorMessage from "./ErrorMessage";
import TrendingList from "./TrendingList";

// Changed Sidebar to semantic <aside> with aria-label
const TrendingRail = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useTrendingPosts();

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  return (
    <aside
      className="text-[var(--color-silver-dark-text)]"
      aria-label="Trending section"
    >
      {/* Semantic region for screen readers */}
      <section aria-labelledby="trending-heading">
        {/* Header: Icon + Heading */}
        <div className="flex items-center mt-3 mb-1 px-2">
          {/* Decorative icon hidden from screen readers */}
          <LucideTrendingUp
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            focusable="false"
          />
          {/* Proper semantic heading */}
          <h2
            id="trending-heading"
            className="text-sm font-medium uppercase tracking-wide"
          >
            Trending Today
          </h2>
        </div>

        {/* Divider */}
        <hr className="border-[var(--color-border)] mb-3" />

        {/* Content: loading, error, or list */}
        {useNProgress(status === "loading")}
        {status === "failed" && <ErrorMessage message={error} />}
        {status === "succeeded" && <TrendingList trendingPosts={posts} />}
      </section>
    </aside>
  );
};

export default TrendingRail;
