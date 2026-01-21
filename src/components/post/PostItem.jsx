import { MessageCircle, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import TimeAgo from "../TimeAgo";

const PostItem = ({
  objectID,
  title,
  url,
  author,
  points,
  num_comments,
  created_at,
  index,
}) => {
  const domain = url ? new URL(url).hostname : null;
  const postLink = `/posts/${objectID}`;

  return (
    <div className={index === 0 ? "" : "mt-[32px]"}>
      <article
        className="block py-4 overflow-hidden
        hover:bg-[var(--color-bg-hover)] 
        rounded-xl 
        transition focus-within:ring-2
        focus-within:ring-offset-2 
        focus-within:ring-[var(--color-ring)] 
        w-[90%] mx-auto max-h-[450px]
        "
        aria-labelledby={`post-title-${objectID}`}
      >
        {/* Use semantic landmark and ensure accessible navigation */}
        <div className="mx-auto">
          <div className="flex justify-between">
            {/* Left: text content */}
            <div className="flex-1 min-w-0">
              {/* Post source and author */}
              <div
                className="flex items-center 
            whitespace-nowrap text-sm 
            text-[var(--color-dark-text)] mb-[1rem]"
              >
                {domain && (
                  <>
                    <img
                      src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`}
                      alt=""
                      className="w-6 h-6 rounded-sm mr-2"
                      aria-hidden="true"
                    />
                    <span className="font-medium">{domain}</span>
                  </>
                )}
                <span className="ml-2 font-medium">by {author}</span>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col">
                  {/* Title wrapped in heading for semantic structure */}
                  <h2
                    id={`post-title-${objectID}`}
                    className="text-[1.25rem] 
                  md:text-[24px] font-bold 
                  leading-snug line-clamp-3 
                  text-[var(--color-text)] 
                  ellipsis"
                  >
                    <Link
                      to={postLink}
                      aria-label={`View post titled "${title}"`}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
                    >
                      {title}
                    </Link>
                  </h2>

                  {/* Post metadata */}
                  <div
                    className="flex 
                  flex-wrap items-center
                  gap-4 text-[13px] 
                  text-[var(--color-silver-dark-text)] mt-3 h-[48px]"
                  >
                    {/* Points */}
                    <div className="flex items-center gap-1">
                      <ArrowUp className="w-4 h-4" aria-hidden="true" />
                      <span className="">
                        {points}
                        <span className="hidden md:inline"> points</span>
                      </span>
                    </div>

                    {/* Time */}
                    <TimeAgo date={created_at} />

                    {/* Comments */}
                    <Link
                      to={postLink}
                      aria-label={`View post titled "${title}"`}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
                    >
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>
                          {num_comments}
                          <span className="hidden md:inline"> comments</span>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Right: thumbnail image */}
                {domain && (
                  <div className="flex-shrink-0 ml-[24px] md:ml-[56px]">
                    <img
                      src={`https://picsum.photos/seed/${domain}160/107`}
                      alt={`Thumbnail image for article: ${title}`}
                      className="w-[80px] h-[53px] md:w-[160px] 
                    md:h-[107px] object-cover 
                    rounded-md"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostItem;
