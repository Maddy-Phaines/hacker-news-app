/* Redux data flow -> HomePage dispatches the fetchPosts action*/
import { useDispatch } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";
import { useEffect } from "react";
import { usePosts } from "../hooks/usePosts";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import PostList from "../components/PostList/PostList";
import Sidebar from "../components/SideBar";

function HomePage() {
  // Get Redux dispatch function for triggering actions
  const dispatch = useDispatch();
  const { posts, status, error } = usePosts();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]); // Runs once on first render to display top stories when HomePage loads

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage message={error} />}
      {status === "succeeded" && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <PostList posts={posts} />
          </div>
          <aside className="flex-[1] sticky top-4 border-l border-[#F2F2F2] pl-4 h-fit self-start">
            <Sidebar />
          </aside>
        </div>
      )}
    </div>
  );
}
export default HomePage;
