import { ArrowUp, MessageCircle, SendIcon } from "lucide-react";
import CommentThread from "../components/CommentThread";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPostDetailError,
  selectPostDetailStatus,
  selectPostDetailData,
  fetchPostDetail,
} from "../features/postDetail/postDetailSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extractDomain } from "../utils/extractDomain";
import { formatDateSafe } from "../utils/formatDate";
import { countAllComments } from "../utils/countAllComments";
import { motion, AnimatePresence } from "framer-motion";

function PostDetailPage() {
  const [comments, showComments] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPostDetail(id))
      .unwrap()
      .then((data) => console.log("Fetched post detail:", data))
      .catch((err) => console.error("Thunk failed:", err));
  }, [dispatch, id]);

  const status = useSelector(selectPostDetailStatus);
  const detail = useSelector(selectPostDetailData);
  const error = useSelector(selectPostDetailError);

  const isFetching = status === "loading" || status === "idle";
  if (isFetching || !detail) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="mx-auto">
      <div className="mx-auto min-w-0 h-screen pt-5">
        <div
          className="grid md:grid-cols-[minmax(0,756px)_minmax(0,316px)] 
        gap-9 "
        >
          <div
            className="mx-auto bg-[var(--color-bg-hover)] 
        hover:bg-[var(--color-bg-hover)] 
      cursor-pointer my-[0.25rem] p-[1rem] 
      rounded-[0.5rem] md:rounded-2xl"
          >
            <div
              className="w-full flex
          flex-col
        md:rounded-2xl
             border-[#FFFFFF19] 
            rounded-[0.5rem] 
            border-[0.0625rem]"
            >
              <div className="p-2">
                {/* Header */}

                <div
                  className="       
            border-[#FFFFFF19] 
            rounded-t-[0.5rem] 
            border-[0.0625rem]"
                >
                  <div
                    className="flex items-center
              pt-[1rem] 
              pl-[1rem]
              pr-[1rem]
              pb-[0.25rem]"
                  >
                    <div className="block mr-2">
                      <img
                        src={`https://www.google.com/s2/favicons?sz=64&domain_url=${detail.url}`}
                        width={25}
                        alt="favicon"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <span
                        className="hidden sm:inline ml-1 mr-1 text-[0.75rem] 
                text-[var(--color-text-neutral)]"
                      >
                        {formatDateSafe(detail.created_at)}
                      </span>
                      <span
                        className="inline sm:hidden ml-1 mr-1 
                  text-[0.75rem] 
                  text-[var(--color-text-neutral)]"
                      >
                        {formatDateSafe(detail.created_at, { short: true })}
                      </span>
                      <span
                        className="ml-1 mr-1 text-[0.75rem] 
                text-[var(--color-text-neutral)]"
                      >
                        By {detail.author}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex
              items-center
              p-3"
                  >
                    <h1
                      className="font-bold 
            mr-1 mb-[16px] 
            text-[1rem] line-clamp-3"
                    >
                      {detail.title}
                    </h1>
                  </div>
                </div>
                <div
                  className="border-[#FFFFFF19] 
          rounded-b-[0.5rem] 
          border-[0.0625rem]
          pt-4 pb-4"
                >
                  <span className="p-3 text-[var(--color-text-neutral)]">
                    {extractDomain(detail.url)}
                  </span>
                </div>

                {/* Body */}
                <div>
                  <p>{detail.story_text}</p>
                </div>

                {/* Meta + Comments Toggle */}
                <div
                  className="flex items-center justify-between
              text-[0.75rem] 
            gap-2 mt-4 pb-2"
                >
                  <div
                    className="border 
            border-[0.0625rem] 
            border-[var(--color-text-neutral)] 
            rounded-[1.25rem] 
            flex 
            items-center gap-1 
            px-3 py-1 
            cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4 cursor-pointer text-[var(--color-text-neutral)]" />
                    <span className="mr-1 text-[var(--color-text-neutral)]">
                      {detail.points}{" "}
                      <span className="hidden md:inline">points</span>
                    </span>
                  </div>

                  <button
                    onClick={() => showComments(!comments)}
                    className="border border-[0.0625rem] border-[var(--color-text-neutral)] text-[12px] rounded-[1.25rem] flex items-center gap-1 px-3 py-1 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[var(--color-text-neutral)]" />
                    <span className="mr-1 text-[var(--color-text-neutral)]">
                      {countAllComments(detail.children)}
                    </span>
                    <span className="hidden md:inline text-[var(--color-text-neutral)]">
                      {comments
                        ? "Hide comments"
                        : `Show comment${
                            countAllComments(detail.children) > 1 ? "s" : ""
                          }`}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Animated Comment Section */}
            <AnimatePresence initial={false}>
              {comments && (
                <motion.div
                  key="comments"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden mt-4"
                >
                  <CommentThread
                    comments={detail.children}
                    depth={0}
                    authorInt={detail.author.slice(0, 3)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
