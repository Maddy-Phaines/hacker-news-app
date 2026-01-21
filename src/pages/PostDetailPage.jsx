// src/pages/PostDetailPage.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { extractDomain } from "../utils/extractDomain";
import { formatDateSafe } from "../utils/formatDate";
import { countAllComments } from "../utils/countAllComments";
import AppTooltip from "../components/AppTooltip";
import useNProgress from "../hooks/useNProgress";
import Header from "../components/Header";
import TimeAgo from "../components/TimeAgo";

import ErrorMessage from "../components/ErrorMessage";
import CommentThread from "../components/CommentThread";
import TrendingRail from "../components/TrendingRail";

import {
  selectPostDetailError,
  selectPostDetailStatus,
  selectPostDetailData,
  fetchPostDetail,
} from "../features/postDetail/postDetailSlice";

export default function PostDetailPage() {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const status = useSelector(selectPostDetailStatus);
  const detail = useSelector(selectPostDetailData);
  const error = useSelector(selectPostDetailError);

  useNProgress(status === "loading");

  useEffect(() => {
    dispatch(fetchPostDetail(id))
      .unwrap()
      .then((data) => console.log("Fetched post detail:", data))
      .catch((err) => console.error("Thunk failed:", err));
  }, [dispatch, id]);

  const totalComments = useMemo(() => {
    if (!detail?.children) return 0;
    return countAllComments(detail.children);
  }, [detail?.children]);

  return (
    <div className="min-h-screen w-full">
      <Header />
      {status === "failed" && (
        <div
          className="max-w-6xl mx-auto 
        px-4 sm:px-6 lg:px-8 mt-4"
        >
          <ErrorMessage message={error} />
        </div>
      )}
      {/* ─── Outer wrapper: keeps content centered with breathing room at all widths ─── */}
      {status === "succeeded" && (
        <div className="">
          <div
            className="max-w-6xl
        mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col lg:flex-row lg:space-x-8 md:py-8">
              {/* ─── Post & Comments Panel ─── */}
              <div className="flex-1 rounded-2xl mb-8 lg:mb-0">
                <div className="overflow-hidden mr-2">
                  <div className="">
                    {/* Author & Date */}
                    <div className="flex items-center mb-4 space-x-3">
                      <img
                        src={`https://www.google.com/s2/favicons?sz=64&domain_url=${detail.url}`}
                        alt=""
                        className="w-8 h-8 rounded"
                      />
                      <div className="text-sm">
                        <p className="font-semibold">By {detail.author}</p>
                        <p className="text-[var(--color-text-neutral)]">
                          <TimeAgo date={detail.created_at}></TimeAgo>
                        </p>
                      </div>
                    </div>

                    {/* Title & Domain */}
                    <h1 className="text-[20px] md:text-[24px] font-bold mb-2">
                      {detail.title}
                    </h1>
                    <p className="text-[var(--color-text-neutral)] mb-4">
                      {extractDomain(detail.url)}
                    </p>

                    {/* Story Text */}
                    {detail.story_text && (
                      <div className="prose prose-invert mb-6">
                        <p>{detail.story_text}</p>
                      </div>
                    )}
                    {/* Post metadata */}
                    <div
                      className="flex flex-wrap items-center gap-4 
                    text-sm text-[var(--color-silver-dark-text)] mt-3"
                    >
                      {/* Points */}
                      <div
                        className="flex items-center gap-1 
                      border rounded-full px-2 py-1 text-xs"
                      >
                        <ArrowUp className="w-4 h-4" aria-hidden="true" />
                        <span>
                          {detail.points}
                          <span className="hidden md:inline"> points</span>
                        </span>
                      </div>

                      {/* Comments */}
                      <AppTooltip
                        content={`${
                          commentsVisible ? "Hide" : "Show"
                        } ${totalComments} comment${
                          totalComments !== 1 ? "s" : ""
                        }`}
                        side="top"
                      >
                        <button
                          className="flex items-center gap-1
                          md:border
                        rounded-full px-2 py-1 text-xs cursor-pointer"
                          onClick={() => setCommentsVisible((v) => !v)}
                        >
                          <span className="flex gap-1">
                            <MessageCircle
                              className="w-4 h-4"
                              aria-hidden="true"
                            />
                            <span className="md:hidden">
                              {countAllComments(detail.children)}
                            </span>
                          </span>
                          <span className="hidden md:inline">
                            {commentsVisible ? "Hide" : "Show"}{" "}
                            {countAllComments(detail.children)} comment
                            {countAllComments(detail.children) !== 1 && "s"}
                          </span>
                        </button>
                      </AppTooltip>
                    </div>
                  </div>

                  {/* Animated Comments */}
                  <AnimatePresence initial={false}>
                    {commentsVisible && (
                      <motion.div
                        key="comments"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
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
              </div>

              {/* ─── TrendingRail ─── */}
              <div className="flex-none w-full lg:w-80 bg-[var(--color-bg)]">
                <TrendingRail />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
