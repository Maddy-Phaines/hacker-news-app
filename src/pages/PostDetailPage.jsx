import { ArrowUp, MessageCircle, Share, Ellipsis, Reply } from "lucide-react";
import PostList from "../components/PostList/PostList";
import PostItem from "../components/PostList/PostItem";
import CommentThread from "../components/CommentThread";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPostDetailError,
  selectPostDetailStatus,
  selectPostDetailData,
  fetchPostDetail,
} from "../features/postDetail/postDetailSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { extractDomain } from "../utils/extractDomain";
import { formatDateSafe } from "../utils/formatDate";
import { countAllComments } from "../utils/countAllComments";
function PostDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("objectID from route:", id);

  useEffect(() => {
    dispatch(fetchPostDetail(id))
      .unwrap()
      .then((data) => console.log("Fetched post detail:", data))
      .catch((err) => console.error("Thunk failed:", err));
  }, [dispatch]);

  const status = useSelector(selectPostDetailStatus);
  const detail = useSelector(selectPostDetailData);
  const error = useSelector(selectPostDetailError);

  /**
   * Strip out all HTML tags and decode HTML entities.
   * @param {string} html
   * @returns {string}
   */
  function stripHtml(html) {
    // Parse the string into a real DOM
    const doc = new DOMParser().parseFromString(html, "text/html");
    // textContent gives you only the rendered text (no tags)
    return doc.body.textContent || "";
  }
  const isFetching = status === "loading" || status === "idle";
  if (isFetching || !detail) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="mx-auto h-50">
      <div className="bg-[#001034]">
        <div className="p-2">
          <div className="flex items-center">
            <div className="block mr-1">
              <img
                src={`https://www.google.com/s2/favicons?sz=64&domain_url={detail.url}`}
                width={20}
              ></img>
            </div>
            <h1 className="font-bold mr-1 mb-[16px] text-[24px]">
              {detail.title}
            </h1>
            <span>(from {extractDomain(detail.url)})</span>
          </div>
          <div>
            <p>{detail.story_text}</p>
          </div>
          <div className="flex items-center text-sm gap-2">
            <div className="bg-[#00225B] text-[12px] rounded-[1.25rem] flex items-center gap-1 px-3 py-1">
              <ArrowUp className="w-4 h-4 cursor-pointer" />
              <span className="mr-1">{detail.points} points</span>
            </div>
            <span className="ml-1 mr-1">By {detail.author}</span>|
            <span className="ml-1 mr-1">
              {formatDateSafe(detail.created_at)}
            </span>
            |
            <div className="bg-[#00225B] text-[12px] rounded-[1.25rem] flex items-center gap-1 px-3 py-1 cursor-pointer">
              <MessageCircle className="w-4 h-4" />
              <span className="mr-1">{countAllComments(detail.children)}</span>
              <span>
                comment{countAllComments(detail.children) > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      <CommentThread
        comments={detail.children}
        depth={0}
        authorInt={`detail.author.slice(0, 3).join("")`}
      />
    </div>
  );
}
export default PostDetailPage;
