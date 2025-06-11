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
    <div className="mx-auto px-4 py-6">
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage message={error} />}
      {status === "succeeded" && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <PostList posts={posts} />
          </div>
          <aside
            className="lgminus:block flex-none w-[368px] border-l border-[#F2F2F2] 
          bg-white pt-10 pl-[clamp(24px,24px+100vw-1080px,40px)] pr-6 min-h-screen sticky top-[57px]"
          >
            <Sidebar />
          </aside>
        </div>
      )}
    </div>
  );
}
export default HomePage;
