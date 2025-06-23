import { useState, useEffect } from "react";
import CommentThread from "./CommentThread";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Avvvatars from "avvvatars-react";
import { formatDateSafe } from "../utils/formatDate";

const CommentCard = ({ comment, depth, authorInt }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    console.log("Depth is:", depth);
  }, [depth]);

  const snippet = comment.text.slice(0, 100);
  const isLongComment = comment.text.length > 100;

  return (
    <div className="mb-4 mt-4 bg-[#001034]">
      {/* 1) The comment itself, always full width */}
      <div className="p-4 rounded-lg text-[#B7CAD4]">
        <div className="flex items-center gap-2 text-sm border border-gray-700">
          <Avvvatars value={authorInt} />
          <span>{comment.author}</span>
          <span className="px-2">|</span>
          <span>{formatDateSafe(comment.created_at)}</span>
        </div>
        <div className="flex items-center">
          {isLongComment && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm p-1 text-[#B7CAD4] cursor-pointer"
            >
              {expanded ? "-" : "+"}
            </button>
          )}
          <p className={expanded ? "" : "line-clamp-3"}>
            {expanded ? comment.text : snippet}
          </p>
        </div>
      </div>
      {comment.children?.length > 0 && (
        <div
          className={"border-l-2 border-gray-300 mt-2"}
          style={{ paddingLeft: depth * 16 }} // 16px per level
        >
          <CommentThread
            className="bg-green"
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
