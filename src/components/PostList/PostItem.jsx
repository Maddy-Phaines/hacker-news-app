import { MessageCircle, ArrowUp } from "lucide-react";
import { formatDateSafe } from "../../utils/formatDate";
import { extractDomain } from "../../utils/extractDomain";
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
    <div className="flex justify-center">
      <div className="my-0 mx-[24px] min-width-0 w-full">
        <div className="mt-[32px] block w-full">
          <article>
            <div className="block">
              {/* ─── Left column: text ─── */}
              <div className="w-full">
                <div className="block">
                  <div className="block w-full">
                    {/* Subheading line: favicon, “From …”, author */}
                    <div className="flex relative">
                      <div className="w-full lg:w-[80%] pt-[32px] border-t border-[var(--color-border)]">
                        <div className="flex">
                          <div className="flex flex-col mb-[16px]">
                            <div className="flex items-center">
                              {url && (
                                <div className="mr-[8px]">
                                  <img
                                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`}
                                    alt="favicon"
                                    className="w-4 h-4 shrink-0"
                                  />
                                </div>
                              )}

                              <span className="text-sm text-gray-600">
                                From {snippet}
                              </span>
                            </div>
                            <span className="truncate text-sm text-gray-600">
                              by {author}
                            </span>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="block flex-1 break-normal">
                            <div className="flex flex-col my-o mx-0 cursor-pointer">
                              {/* Title */}
                              <Link to={`/posts/${objectID}`}>
                                <h2
                                  className="text-[1.25rem]
                                  md:text-[1.5rem] 
                                  capitalize
                                  max-h-[96px]
                                  md:max-h-[90px] 
                                  font-bold 
                                  tracking-[0px] 
                                  tracking-[-0.016em] 
                                  leading-[25px]
                                  md:leading-[30px]
                                  line-clamp-4 md:line-clamp-3"
                                >
                                  {title}
                                </h2>
                              </Link>
                              <div className="pt-[8px]"></div>
                              <h3
                                className="text-[1rem] 
                                font-normal
                                text-[#6B6B6B] 
                                max-h-[40px] 
                                leading-[20px] 
                                line-clamp-2 
                                m-0"
                              >
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                              </h3>
                            </div>
                          </div>

                          {/* ─── Right column: thumbnail ─── */}
                          {url && (
                            <div className="block ml-[24px] md:ml-[56px]">
                              <div className="overflow-hidden">
                                <img
                                  className="w-[80px] h-[53px] md:w-[160px] md:h-[107px]"
                                  src={`https://picsum.photos/seed/${
                                    new URL(url).hostname
                                  }80/53`}
                                  alt="placeholder"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-[12px]">
                          {/* Meta row */}
                          <span
                            className="text-[13px]
                            gap-x-4 
                            gap-y-2
                            font-normal
                            leading-[20px]"
                          >
                            <div className="h-[48px] flex items-center gap-[1rem]">
                              <div className="flex items-center gap-1">
                                <ArrowUp className="w-4 h-4 cursor-pointer" />
                                <span>
                                  {points}{" "}
                                  <span className="hidden md:inline">
                                    points
                                  </span>
                                </span>
                              </div>
                              <div>{formatDateSafe(created_at)}</div>
                              <div className="flex items-center gap-1 cursor-pointer">
                                <MessageCircle className="w-4 h-4" />
                                <span>
                                  {num_comments}{" "}
                                  <span className="hidden md:inline">
                                    comments
                                  </span>
                                </span>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
