// Shows trending stories
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingPosts, // thunk to trigger API request
  selectTrendingPosts, // read data from state
  selectTrendingPostsStatus, // read status from state
  selectTrendingPostsError, // read error from state
} from "../features/trendingPosts/trendingPostsSlice";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useEffect } from "react";

// Sidebar stub
const Sidebar = () => {
  const dispatch = useDispatch();
  const trendingPosts = useSelector(selectTrendingPosts);
  const status = useSelector(selectTrendingPostsStatus);
  const error = useSelector(selectTrendingPostsError);

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, [dispatch]);

  return (
    <aside className="bg-gray-100 p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Trending</h2>
      <p>Sidebar content here</p>
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage message={error} />}
      {status === "succeeded" && (
        /* rendered data displayed here */
      )}
    </aside>
  );
};

export default Sidebar;
