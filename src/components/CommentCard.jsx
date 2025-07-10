import { useState, useEffect } from "react";
import CommentThread from "./CommentThread";
import AddButton from "./AddButton";
import MinusButton from "./minusButton";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Avvvatars from "avvvatars-react";
import { formatDateSafe } from "../utils/formatDate";
import { stripHtml } from "../utils/stripHtml";

const CommentCard = ({ comment, depth, authorInt }) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const hasReplies = comment.children && comment.children.length > 0;

  const cleanedText = comment.text ? stripHtml(comment.text) : "";
  const isLongComment = cleanedText.length > 100;
  const snippet = cleanedText.slice(0, 100);

  /* re: dark/default mode, Card, Sidebar, Header, Footer → specific backgrounds

Button, Link, Alert → specific text/background/border */

  return (
    <div
      className="border mb-4 mt-4 bg-[hsla(210, 14%, 9%, 0.8] 
    rounded-lg"
    >
      <div className="border border-[#00FF00]">
        {/* Comment content */}
        <div
          className="border border-[#00FF00] 
        text-[var(--color-text-neutral)]"
        >
          <summary
            className="border 
          grid grid-cols-[24px_minmax(0,1fr)]
          sm:grid-cols-[32px_minmax(0,1fr)]"
          >
            <div className="relative">
              <Avvvatars value={authorInt} />
            </div>

            <div
              className="flex relative gap-1
          text-sm border border-gray-700 
          rounded-full 
          px-2 py-1 mb-2"
            >
              <div
                className="flex mr-0 py-[2px] 
              min-w-0 max-w-full items-center
              text-[0.875rem]"
              >
                <span>{comment.author || "anonymous"}</span>
                <span className="px-2">|</span>
                <span className="inline sm:hidden">
                  {formatDateSafe(comment.created_at, { short: true })}
                </span>
                <span className="hidden sm:inline">
                  {formatDateSafe(comment.created_at, { short: false })}
                </span>
              </div>
            </div>
          </summary>
        </div>
        <div
          className="rounded-[0.5rem] 
                grid grid-cols-[24px_1fr] 
                relative 
                sm:grid-cols-[32px_1fr]"
        >
          <div
            className="pl-[1.75rem] 
          leading-[1.0625rem] min-w-0"
          >
            <div></div>
          </div>

          <div
            className="border
            border-[#FFC0CB]"
          >
            <div className="flex">
              {isLongComment && (
                <button
                  onClick={() => setShowFullComment(!showFullComment)}
                  className="text-sm p-1 text-[#B7CAD4] font-mono cursor-pointer"
                >
                  {showFullComment ? "−" : "+"}
                </button>
              )}
              <div className="min-w-0">
                <div className="border min-w-0 border-[#FFF]">
                  <div
                    className="min-w-0       
            border-[#FFFFFF19] 
            rounded-t-[0.5rem] 
            border-[0.0625rem] 
            text-12 py-[0.25rem] 
            overflow-hidden"
                  >
                    <div
                      className="block w-full text-12 text-[var(--color-text-neutral)] py-0 
                  md:mx-[0.5rem] md:mt-0"
                    >
                      <p
                        className={
                          showFullComment || !isLongComment
                            ? ""
                            : "line-clamp-3"
                        }
                      >
                        {showFullComment || !isLongComment
                          ? cleanedText
                          : snippet + "..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-14 p-[0.5rem]">
              {/* Lazy reply toggle */}
              {hasReplies && (
                <div className="mt-2">
                  <button
                    type="button"
                    className="text-xs 
                    text-400 
                    text-[var(--color-text-neutral)]
                    inline-flex
                    items-center
                    gap-1 
                    underline
                    cursor-pointer"
                    aria-expanded={showReplies}
                    onClick={() => setShowReplies((prev) => !prev)}
                  >
                    {!showReplies ? <AddButton /> : <MinusButton />}

                    {showReplies
                      ? "Hide replies"
                      : `Show ${comment.children.length} repl${
                          comment.children.length > 1 ? "ies" : "y"
                        }`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nested replies (lazy rendered) */}
      {showReplies && hasReplies && (
        <div
          className="border-l-2 border-gray-700 ml-4 mt-2"
          style={{ paddingLeft: depth * 16 }}
        >
          <CommentThread
            comments={comment.children}
            depth={depth + 1}
            authorInt={authorInt}
          />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
