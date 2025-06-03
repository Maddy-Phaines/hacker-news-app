import { MessageCircle, ArrowUp } from "lucide-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

/* Displays single post (title, metadata, link)
Reusable */
/* presentational only */
const PostItem = ({ post }) => {
  const { objectId, title, url, author, points, num_comments, created_at } =
    post;
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 hover:bg-gray-50 transition">
      {/* Post Title */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {title}
          </a>
        </h2>
      </div>
      {/* Post Metadata */}
      <div className="text-sm text-gray-500 flex flex-wrap gap-4">
        <div className="flex items-center gap-1">
          <ArrowUp className="w-4 h-4" />
          <span>{points} points</span>
        </div>

        <div>by {author}</div>

        <div>
          {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
        </div>

        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{num_comments} comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
