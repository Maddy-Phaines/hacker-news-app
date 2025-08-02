import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import useNProgress from "../hooks/useNProgress";

import {
  selectSearchQuery,
  selectSearchHits,
  selectSearchStatus,
  selectSearchError,
  selectSearchHasMore,
  selectSearchTotalHits,
  selectSearchPage,
  selectSearchHitsPerPage,
  selectSearchTag,
  setQuery,
  setTag,
  fetchSearch,
} from "../features/search/searchSlice";

import PostList from "../components/PostList";
import ErrorMessage from "../components/ErrorMessage";
import Sidebar from "../components/SidebarA";
import SelectCategory from "../components/SelectCategory";
import Header from "../components/Header";

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Redux state
  const query = useSelector(selectSearchQuery);
  const tag = useSelector(selectSearchTag);
  const hits = useSelector(selectSearchHits);
  const status = useSelector(selectSearchStatus);
  const error = useSelector(selectSearchError);
  const hasMore = useSelector(selectSearchHasMore);
  const totalHits = useSelector(selectSearchTotalHits);
  const page = useSelector(selectSearchPage);
  const perPage = useSelector(selectSearchHitsPerPage);

  useNProgress(status === "loading");
  // Hydrate Redux from URL on first mount
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const cat = searchParams.get("cat") ?? "story";

    dispatch(setQuery(q));
    dispatch(setTag(cat));

    if (q.trim()) {
      dispatch(fetchSearch({ append: false }));
    }
  }, [dispatch, searchParams]);

  // Debounce search if query or tag change
  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery || status === "idle") return;

    const id = setTimeout(() => {
      setSearchParams({ q: trimmedQuery, cat: tag }, { replace: true });
      dispatch(fetchSearch({ append: true }));
    }, 300);

    return () => clearTimeout(id);
  }, [query, tag, dispatch, setSearchParams]);

  return (
    <div>
      <Header />
      {status === "failed" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <ErrorMessage message={error} />
        </div>
      )}
      <div
        className="max-w-6xl 
    mx-auto px-4 
    py-6"
      >
        <div
          className="my-0 mx-[24px] min-width-0 mx-auto
      hover:rounded-[1rem] hover:bg-[var(--color-bg-hover)] py-[0.25rem]"
        >
          <div
            className="md:inline mb-5 max-h-[24px] 
          leading-[1.25] clamp-1 tracking-[0.016em]"
          >
            <span className="text-[var(--color-bg-pasta)]">
              Results for&nbsp;
            </span>
            <span className="italic lowercase">{query}</span>
            <p className="text-grey-500 mt-2">
              Page {page}: 1&nbsp;-&nbsp;{perPage} of {totalHits} results
            </p>
          </div>
        </div>
        {/* ───── Search summary + category nav ───── */}
        <header className="mb-1">
          <div className="w-full">
            <div className="px-[0.2rem] lg:px-0 pt-[1rem]">
              <nav>
                <SelectCategory />
              </nav>
            </div>
          </div>
        </header>

        {/* ───── Results Info ───── */}
        <div className="">
          {/* ───── 2-column Layout ───── */}
          <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,756px)_minmax(0,316px)] gap-8 mx-auto">
            {/* Main Content */}
            <main className="flex-1 space-y-6">
              <PostList posts={hits} />
              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={() => dispatch(fetchSearch({ append: true }))}
                    className="px-12 py-2 bg-secondary rounded-[20px] 
                  hover:bg-gray-700 cursor-pointer transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </main>

            {/* Sidebar */}
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
    </div>
  );
};

export default SearchResultsPage;
