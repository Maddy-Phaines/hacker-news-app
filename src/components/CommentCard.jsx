// src/components/CommentCard.jsx
import React, { useState } from "react";
import CommentThread from "./CommentThread";
import AddButton from "./AddButton";
import MinusButton from "./MinusButton";
import Avvvatars from "avvvatars-react";
import { formatDateSafe } from "../utils/formatDate";
import { stripHtml } from "../utils/stripHtml";

const WORD_LIMIT = 60; // only truncate if > 60 words

const CommentCard = ({ comment, depth, authorInt }) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const hasReplies = comment.children?.length > 0;
  const cleanedText = stripHtml(comment.text || "");

  // DRY preprocessing
  const words = cleanedText.split(/\s+/);
  const isTruncatable = words.length > WORD_LIMIT;
  const snippet = words.slice(0, WORD_LIMIT).join(" ");
  const displayText = showFullComment || !isTruncatable ? cleanedText : snippet;
  const togglePrefix = showFullComment ? "" : "...";
  const toggleLabel = showFullComment ? "show less" : "more";

  return (
    <div
      className="mb-4 mt-4
    border-t border-[var(--color-border-reply)] rounded-lg p-4"
    >
      {/** ─── Header: avatar, author & time ─── */}
      <div
        className="
          grid grid-cols-[24px_minmax(0,1fr)]
          sm:grid-cols-[32px_minmax(0,1fr)]
          items-center
          gap-2
          mb-2
        "
      >
        <div className="flex items-center">
          <Avvvatars value={authorInt} />
        </div>
        <div className="flex flex-col text-sm text-[var(--color-text-neutral)]">
          <span className="font-semibold text-[var(--color-text)]">
            {comment.author || "anonymous"}
          </span>
          <span className="text-xs">{formatDateSafe(comment.created_at)}</span>
        </div>
      </div>

      {/** ─── Comment text + “more/less” ─── */}
      <div className="min-w-0 rounded-t-[0.5rem] text-12 py-[0.25rem] overflow-hidden">
        <div className="block w-full text-12 text-[var(--color-text-neutral-2)]">
          <p className="inline">
            {displayText}
            {isTruncatable && (
              <button
                onClick={() => setShowFullComment((v) => !v)}
                className="cursor-pointer ml-1 text-sm underline text-[var(--color-text-neutral)]"
              >
                {togglePrefix}
                {toggleLabel}
              </button>
            )}
          </p>
        </div>
      </div>

      {/** ─── Lazy replies toggle ─── */}
      {hasReplies && (
        <div className="mt-2">
          <button
            type="button"
            className="cursor-pointer text-xs text-[var(--color-text-neutral)] inline-flex items-center gap-1 underline"
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

      {/** ─── Nested replies ─── */}
      {showReplies && hasReplies && (
        <div className="ml-6 mt-2" style={{ paddingLeft: depth * 16 }}>
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
