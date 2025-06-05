import { MessageCircle, ArrowUp } from "lucide-react";
import { formatDateSafe } from "../../utils/formatDate";
/* Displays single post (title, metadata, link)
Reusable */
/* presentational only */
const PostItem = ({
  objectId,
  title,
  url,
  author,
  points,
  num_comments,
  created_at,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6 hover:bg-gray-50 transition">
      {/* Post Title */}
      <div className="flex items-center">
        {url && (
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`}
            alt="Favicon"
            className="w-5 h-5 mr-2"
          />
        )}
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

        <div>{formatDateSafe(created_at)}</div>

        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{num_comments} comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
