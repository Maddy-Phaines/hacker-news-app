import { MessageCircle, ArrowUp } from "lucide-react";
import { formatDateSafe } from "../../utils/formatDate";
import { Link } from "react-router-dom";
/* Displays single post (title, metadata, link)
Reusable */
/* presentational only */
const PostItem = ({
  objectID,
  title,
  url,
  author,
  points,
  num_comments,
  created_at,
  story_text,
  _highlightResult,
}) => {
  let snippet = story_text;

  if (!snippet && _highlightResult) {
    const highlight =
      _highlightResult.story_text?.value ||
      _highlightResult.comment_text?.value ||
      _highlightResult.title?.value;
  }

  if (!snippet && url) {
    snippet = new URL(url).hostname;
  }
  return (
    <article className="w-full border-b border-gray-200 py-6">
      {/* 1) full-width flex parent, centers its single child */}
      <div className="flex justify-center">
        {/*
           2) this is the “card” container:
              - w-full to fill its parent
              - max-w-[680px] at md+ (you can swap in your only-mdplus screen)
              - mx-6 gives you exactly 24px on each side at all viewports
              - min-w-0 ensures flex children can shrink inside
              - flex flex-col md:flex-row lays out text/image side by side
              - gap-6 puts 1.5rem between them
              - max-h-[450px] caps the height (if you want to guard against huge content)
        */}
        <div className="w-full max-w-[680px] mx-6 min-w-0 flex flex-col md:flex-row gap-6 max-h-[450px]">
          {/* ─── Left column: text ─── */}
          <div className="flex-1 space-y-3 overflow-hidden">
            {/* Subheading line: favicon, “From …”, author */}
            <div className="flex items-center text-sm text-gray-600 gap-2">
              {url && (
                <img
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`}
                  alt="favicon"
                  className="w-4 h-4 shrink-0"
                />
              )}
              <span className="truncate">From {snippet}</span>
              <span className="truncate">by {author}</span>
            </div>

            {/* Title */}
            <Link to={`/posts/${objectID}`} className="hover:underline">
              <h2
                className="text-xl md:text-2xl font-semibold tracking-tight 
              leading-snug capitalize"
              >
                {title}
              </h2>
            </Link>
            <p className="p-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ad
              quod sapiente excepturi.
            </p>
            {/* Meta row */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4 cursor-pointer" />
                <span>{points} points</span>
              </div>
              <div>{formatDateSafe(created_at)}</div>
              <div className="flex items-center gap-1 cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>{num_comments} comments</span>
              </div>
            </div>
          </div>

          {/* ─── Right column: thumbnail ─── */}
          {url && (
            <div className="flex-shrink-0 flex flex-col justify-end">
              <div className="w-[160px] h-[107px] overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${
                    new URL(url).hostname
                  }/320/180`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {!story_text && (
                <div
                  className="py-8 text-center hover:text-gray-700 
                cursor-pointer"
                >
                  <a to={url}>visit original</a> to read
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostItem;
