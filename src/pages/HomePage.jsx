// src/pages/HomePage.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import PageContainer from "../components/PageContainer";
import ErrorMessage from "../components/ErrorMessage";
import PostList from "../components/PostList";
import TrendingRail from "../components/TrendingRail";

import { usePosts } from "../hooks/usePosts";
import { setTab } from "../features/ui/uiSlice";
import slugifyTag from "../utils/slugifyTag";
import useNProgress from "../hooks/useNProgress";

export default function HomePage() {
  const { tag } = useParams(); // "ask", "show", "polls" or undefined
  const dispatch = useDispatch();
  const { posts, status, error } = usePosts();

  useNProgress(status === "loading");

  // keep uiSlice in sync with URL
  useEffect(() => {
    const normalized = tag ? slugifyTag(tag) : "front_page";
    dispatch(setTab(normalized));
  }, [tag, dispatch]);

  return (
    <div className="">
      <Header />
      <PageContainer>
        {status === "failed" && <ErrorMessage message={error} />}
        {status === "succeeded" && (
          <div
            className="
              flex flex-col
              lg:flex-row
              gap-8

              /* center & constrain overall 
              layout */
              px-0 
              
            "
          >
            {/** LEFT COLUMN: only for non‑Best tabs */}
            {tag !== "best" && (
              <div
                className="min-w-0 
              border-r 
              border-[var(--color-border)] 
              mx-[24px]"
              >
                <PostList posts={posts} />
              </div>
            )}

            {/** RIGHT COLUMN on non‑Best, MAIN COLUMN on Best */}
            <div
              className={`
                ${
                  tag === "best"
                    ? /* Best: use the flex-1 main column instead of sidebar */
                      "flex-1 min-w-0 px-4 mx-1 sm:mx-2"
                    : /* Other tabs: fixed sidebar on desktop */
                      "flex-none w-full lg:w-[320px] pt-[2rem]"
                }
              `}
            >
              <TrendingRail />
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
