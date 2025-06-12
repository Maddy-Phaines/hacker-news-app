import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
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
  fetchSearch,
} from "../features/search/searchSlice";
import PostList from "../components/PostList/PostList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Sidebar from "../components/SideBar";

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const hits = useSelector(selectSearchHits);
  const status = useSelector(selectSearchStatus);
  const error = useSelector(selectSearchError);
  const errorCode = useSelector(selectSearchError);
  const hasMore = useSelector(selectSearchHasMore);
  const totalHits = useSelector(selectSearchTotalHits);
  const page = useSelector(selectSearchPage);
  const perPage = useSelector(selectSearchHitsPerPage);
  const sortBy = useSelector(selectSearchSortBy);

  useEffect(() => {
    dispatch(fetchSearch({ append: false }));
  }, [dispatch]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <ErrorMessage message={error.message} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-6">
        Results for <span className="italic">{query}</span>
      </h1>

      {/* Two-column flex: content + sidebar */}
      <div className="flex flex-col md:flex-row gap-20 border-t border-[#F2F2F2]">
        {/* ──────── Main content ──────── */}
        <main className="flex-1 space-y-6">
          <PostList posts={hits} />
          {hasMore && (
            <div className="text-center">
              <button
                onClick={() => dispatch(fetchSearch({ append: true }))}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </main>

        {/* ──────── Sidebar ──────── */}
        <aside
          className="md: block flex-none w-[368px] lgminus:block flex-none w-[368px] border-l border-[#F2F2F2] 
          bg-white pt-10 pl-[clamp(24px,24px+100vw-1080px,40px)] pr-6 min-h-screen sticky top-[57px]"
        >
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  );
};
export default SearchResultsPage;
