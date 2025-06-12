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
    <div className="max-h-[450px]">
      <div className="flex justify-center">
        <div
          className="w-full only-mdplus:max-w-[680px] 
    bg-white my-0 mx-6 border-b border-[#F2F2F2] 
    hover:transition"
        >
          <div className="mt-[32px]">
            <div className="wrap-break-word">
              {/* Post Title */}
              <div className="flex flex-col items-start">
                {url && (
                  <div className="pt-5">
                    <img
                      src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`}
                      alt="Favicon"
                      className="w-10 h-10 mr-2"
                    />
                  </div>
                )}
                <div className="pt-5">
                  <h2 className="text-xl capitalize min-[728px]:text-2xl tracking-[0.016em] leading-[30px] font-bold text-gray-900">
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
              </div>
              {/* Post Metadata */}
              <div className="text-sm text-gray-500 flex flex-wrap gap-4 pb-[20px]">
                <div className="flex h-[48px] justify-between w-full">
                  <div className="flex gap-1">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-4 h-4" />
                      <span>{points} points</span>
                    </div>

                    <div className="flex items-center">by {author}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>{formatDateSafe(created_at)}</div>

                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{num_comments} comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
