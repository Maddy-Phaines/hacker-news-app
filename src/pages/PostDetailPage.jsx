import { ArrowUp, MessageCircle, SendIcon } from "lucide-react";
import Header from "../components/Header";
import CommentThread from "../components/CommentThread";
import TrendingRail from "../components/TrendingRail";
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
    <div
      className="
    bg-[var(--color-bg)] z-6"
    >
      <Header />
      <div
        className="min-h-screen
        lg:w-[1000px] mx-auto"
      >
        <div className="mx-auto min-w-0 min-h-screen pt-5">
          <div
            className="grid
          md:grid-cols-[minmax(0,756px)_minmax(0,316px)] 
        gap-9 border"
          >
            <div
              className="bg-[var(--color-bg)]
      cursor-pointer my-[0.25rem] p-[1rem] 
      rounded-[0.5rem] md:rounded-2xl"
            >
              <details role="article" open actioned className="">
                <summary className="grid grid-cols-[24px_minmax(0,1fr)] xs:grid-cols-[32px_minmax(0,1fr)]">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center outline">
                      <a className="flex items-center my-[0.25rem] md:mr-[0.75rem]">
                        <span className="inline-flex items-center justify-center w-[2rem] h-[2rem]">
                          <span
                            className="inline-block rounded-full relative
                        [&> :first-child]:h-full
                        [&> :first-child]:w-full
                        [&> :first-child]:mb-0
                        [&> :first-child]:rounded-[inherit]
                        [&> :first-child]:overflow-hidden
                        [&> :first-child]:max-h-full"
                          >
                            <img
                              src={`https://www.google.com/s2/favicons?sz=64&domain_url=${detail.url}`}
                              alt="favicon"
                              className="h-full w-full"
                            />
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div
                    className=" flex flex-row items-center max-w-full 
                    py-[2px] ml-[0.5rem]
                   min-w-0 mr-0"
                  >
                    <div
                      className="
                    flex items-center 
                    pr-[0.5rem] 
                    overflow-hidden"
                    >
                      <div
                        className="flex flex-col 
                      overflow-hidden text-[0.875rem]
                      "
                      >
                        <span
                          className="ml-1 mr-1 
                text-[#fff] font-bold"
                        >
                          By {detail.author}
                        </span>
                        <span
                          className="hidden 
                      sm:inline ml-1 mr-1 
                      text-[0.75rem] 
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
                      </div>
                    </div>
                  </div>
                </summary>
              </details>
              <div
                className="
                rounded-[0.5rem] 
                grid grid-cols-[24px_1fr] 
                relative 
                sm:grid-cols-[32px_1fr]"
              >
                <div
                  className="pl-[1.75rem]
                  leading-[1.0625rem]"
                ></div>
                {/* Header */}
                <div className="min-w-0">
                  <div
                    className="       
            border-[#FFFFFF19] 
            border-[0.0625rem] 
            rounded-t-[0.5rem] 
            text-12 py-[0.25rem] 
            overflow-hidden"
                  >
                    <div
                      className="inline-block max-w-full text-12 
                    py-0 md:mx-[0.5rem] md:mt-0"
                    >
                      <h1
                        className="font-bold 
            mr-1 md:mt-0 mb-[1rem] text-[var(--color-text-neutral)]
            line-clamp-3"
                      >
                        {detail.title}
                      </h1>
                    </div>
                  </div>
                  <div
                    className="border-[#FFFFFF19] 
          rounded-b-[0.5rem] 
          border-[0.0625rem]"
                  >
                    <span className="pl-3 text-[var(--color-text-neutral)]">
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
                      className="bg-[var(--color-bg)] border 
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
            <div className="rounded-2xl bg-[var(--color-bg)]">
              <TrendingRail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
