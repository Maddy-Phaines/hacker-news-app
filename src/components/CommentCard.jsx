import { useState, useEffect } from "react";
import CommentThread from "./CommentThread";
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
      className="mb-4 mt-4 bg-[var(--color-bg-hover)] 
    rounded-lg"
    >
      {/* Comment content */}
      <div className="p-4 text-[var(--color-text-muted)]">
        <div className="flex items-center gap-2 text-sm border border-gray-700 rounded-full px-3 py-1 mb-2">
          <Avvvatars value={authorInt} />
          <span>{comment.author || "anonymous"}</span>
          <span className="px-2">|</span>
          <span className="inline sm:hidden">
            {formatDateSafe(comment.created_at, { short: true })}
          </span>
          <span className="hidden sm:inline">
            {formatDateSafe(comment.created_at, { short: false })}
          </span>
        </div>

        <div className="flex items-start">
          {isLongComment && (
            <button
              onClick={() => setShowFullComment(!showFullComment)}
              className="text-sm p-1 text-[#B7CAD4] font-mono cursor-pointer"
            >
              {showFullComment ? "−" : "+"}
            </button>
          )}
          <p
            className={showFullComment || !isLongComment ? "" : "line-clamp-3"}
          >
            {showFullComment || !isLongComment ? cleanedText : snippet + "..."}
          </p>
        </div>

        {/* Lazy reply toggle */}
        {hasReplies && (
          <button
            className="text-xs text-blue-400 hover:underline mt-2"
            onClick={() => setShowReplies((prev) => !prev)}
          >
            {showReplies
              ? "Hide replies"
              : `Show ${comment.children.length} repl${
                  comment.children.length > 1 ? "ies" : "y"
                }`}
          </button>
        )}
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
