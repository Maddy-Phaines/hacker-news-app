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
    <div className="mx-auto py-6">
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage message={error} />}
      {status === "succeeded" && (
        <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,756px)_minmax(0,316px)] gap-8">
          <div className="flex-1">
            <PostList posts={posts} />
          </div>
          <aside
            className="lgminus:block flex-none lg:w-[316px] 
            w-full bg-[var(--color-sidebar)] 
            border-l border-[var(--color-border)]
          pt-10 pl-[clamp(24px,24px+100vw-1080px,40px)] 
          pr-6 sticky top-[57px]"
          >
            <Sidebar />
          </aside>
        </div>
      )}
    </div>
  );
}
export default HomePage;
