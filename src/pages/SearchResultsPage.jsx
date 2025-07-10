import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  selectSearchQuery,
  selectSearchHits,
  selectSearchStatus,
  selectSearchError,
  selectSearchHasMore,
  selectSearchTotalHits,
  selectSearchPage,
  selectSearchHitsPerPage,
  selectSearchSortBy,
  selectSearchTag,
  setQuery,
  setTag,
  fetchSearch,
} from "../features/search/searchSlice";

import PostList from "../components/PostList/PostList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Sidebar from "../components/SidebarA";
import SelectCategory from "../components/SelectCategory";
import Header from "../components/Header";

const SearchResultsPage = () => {
  /* slice values */
  const query = useSelector(selectSearchQuery);
  const tag = useSelector(selectSearchTag);
  const hits = useSelector(selectSearchHits);
  const status = useSelector(selectSearchStatus);
  const error = useSelector(selectSearchError);
  const errorCode = useSelector(selectSearchError);
  const hasMore = useSelector(selectSearchHasMore);
  const totalHits = useSelector(selectSearchTotalHits);
  const page = useSelector(selectSearchPage);
  const perPage = useSelector(selectSearchHitsPerPage);
  const sortBy = useSelector(selectSearchSortBy);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  /* Hydrate Redux from URL on first mount */
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const cat = searchParams.get("cat") ?? "story";

    dispatch(setQuery(q));
    dispatch(setTag(cat));
    if (q.trim()) {
      dispatch(fetchSearch({ append: false }));
    }
  }, [dispatch, searchParams]);

  /* Debounce fetch whenever query or tag change */
  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery || status === "idle") return;

    const id = setTimeout(() => {
      // keep address bar in sync
      setSearchParams({ q: trimmedQuery, cat: tag }, { replace: true });
      dispatch(fetchSearch({ append: true }));
    }, 300);

    return clearTimeout(id);
  }, [query, tag, dispatch, setSearchParams]);

  /* loading / error states */
  if (status === "loading") return <Loader />;
  if (status === "failed") return <ErrorMessage message={error.message} />;

  return (
    <div
      className="max-w-6xl 
    mx-auto px-4 
    py-6"
    >
      <Header />
      {/* ───── Search summary + category nav ───── */}
      <header className="mb-1">
        <h1
          className="hidden md:inline text-[1.5rem]
          font-medium
          mb-5
          max-h-[30px] 
          leading-[1.25] 
          md:text-[42px] 
          font-bold clamp-1 
          tracking-[0.016em]"
        >
          <span className="text-[var(--color-bg-pasta)]">
            Results for&nbsp;
          </span>
          <span className="italic lowercase">{query}</span>
        </h1>

        <p className="hidden md:inline mt-2 text-sm text-grey-500 mt-2">
          Page {page}: 1&nbsp;-&nbsp;{perPage} of {totalHits} results
        </p>

        {/* button-group */}
        <div className="w-full">
          <div className="px-[0.2rem] lg:px-0">
            <div className="pt-[1rem]">
              <nav>
                <SelectCategory />
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Two-column flex: content + sidebar */}
      <div>
        <div
          className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,756px)_minmax(0,316px)] gap-8
        gap-9 mx-auto"
        >
          {/* ──────── Main content ──────── */}
          <main className="flex-1 space-y-6">
            <PostList posts={hits} />
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={() => dispatch(fetchSearch({ append: true }))}
                  className="px-12 py-2 bg-secondary rounded-[20px] hover:bg-gray-700 cursor-pointer transition"
                >
                  Load More
                </button>
              </div>
            )}
          </main>

          {/* ──────── Sidebar ──────── */}
          <aside
            className="lgminus:block flex-none lg:w-[316px] 
            max-w-full bg-[var(--color-sidebar)] 
            border-l border-[var(--color-border)]
          pt-10 pl-[clamp(24px,24px+100vw-1080px,40px)] 
          pr-6 sticky top-[57px]"
          >
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
export default SearchResultsPage;
