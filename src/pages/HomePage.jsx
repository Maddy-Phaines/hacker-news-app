/* Redux data flow -> HomePage dispatches the fetchPosts action*/
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPosts,
  selectPostsStatus,
  selectPostsError,
} from "../features/posts/postsSlice";
import { useEffect } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import PostList from "../components/PostList/PostList";
import Sidebar from "../components/SideBar";

function HomePage() {
  // Get Redux dispatch function for triggering actions
  const dispatch = useDispatch();

  // Select posts data array from the store
  const posts = useSelector(selectPosts);
  // Select current loading status ("idle" | "loading" | "succeeded" | "failed") from the store
  const status = useSelector(selectPostsStatus);
  // Select error message from the store
  const error = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]); // Runs once on first render to display top stories when HomePage loads

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1>Home Page</h1>
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage message={error} />}
      {status === "succeeded" && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <PostList posts={posts} />
          </div>
          <aside className="w-full md:w-80">
            <Sidebar />
          </aside>
        </div>
      )}
    </div>
  );
}
export default HomePage;
