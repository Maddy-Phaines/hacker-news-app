import { useState } from "react";
import AddButton from "../ui/AddButton";
import MinusButton from "../MinusButton";
import Avvvatars from "avvvatars-react";
import { formatDateSafe } from "../../utils/date/formatDate";
import { stripHtml } from "../../utils/string/stripHtml";
import CommentThread from "./CommentThread";

const WORD_LIMIT = 60;

export default function CommentCard({ comment, depth, authorInt }) {
  const [showFullComment, setShowFullComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const hasReplies = comment.children?.length > 0;
  const cleanedText = stripHtml(comment.text || "");

  const words = cleanedText.split(/\s+/);
  const isTruncatable = words.length > WORD_LIMIT;
  const snippet = words.slice(0, WORD_LIMIT).join(" ");
  const displayText = showFullComment || !isTruncatable ? cleanedText : snippet;

  return (
    <div className="mb-4 mt-4 rounded-lg p-4">
      {/* header */}
      <div className="flex gap-2 mb-2 items-center">
        <Avvvatars value={authorInt} />
        <div className="text-sm">
          <p className="font-semibold">{comment.author || "anonymous"}</p>
          <p className="text-xs">{formatDateSafe(comment.created_at)}</p>
        </div>
      </div>

      {/* body */}
      <p className="text-sm">
        {displayText}
        {isTruncatable && (
          <button
            onClick={() => setShowFullComment((v) => !v)}
            className="ml-1 underline text-sm"
          >
            {showFullComment ? "show less" : "...more"}
          </button>
        )}
      </p>

      {/* replies */}
      {hasReplies && (
        <button
          onClick={() => setShowReplies((v) => !v)}
          className="mt-2 text-xs underline flex items-center gap-1"
        >
          {showReplies ? <MinusButton /> : <AddButton />}
          {showReplies
            ? "Hide replies"
            : `Show ${comment.children.length} replies`}
        </button>
      )}

      {showReplies && (
        <div className="ml-4 mt-2">
          <CommentThread
            comments={comment.children}
            depth={depth + 1}
            authorInt={authorInt}
          />
        </div>
      )}
    </div>
  );
}
