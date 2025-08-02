// preview of trending stories
import { formatDateSafe } from "../utils/formatDate";
import { extractDomain } from "../utils/extractDomain";

const TrendingItem = ({ title, author, url, created_at, objectId }) => {
  return (
    <div className="block py-[0.5rem] z-[999]">
      <div
        className="h-full 
      py-4 border-b 
        border-[var(--color-border)]"
      >
        <a
          href={url}
          className="flex 
        flex-col gap-1"
        >
          <span
            className="text-12 
            text-[var(--color-silver-dark-text)]"
          >
            <span
              className="h-[1.25rem] 
            inline-block"
            >
              <span
                className="font-sohne
    font-bold
    text-base 
    leading-5
    overflow-hidden
    m-0
    md:text-[14px]
    mdplus:leading-[30px]
    mdplus:max-h-[90px]
    mdplus:tracking-[-0.016em]
    md:line-clamp-2
    "
              >
                {title}
              </span>
            </span>
          </span>
          <div className="flex items-center">
            <div className="block mr-1">
              {url && (
                <img
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`}
                  alt="Favicon"
                  className="w-6 h-6 mr-2 rounded-sm"
                />
              )}
            </div>
            <div
              className="text-sm flex 
              items-center
            gap-1"
            >
              <div className="block text-[var(--color-silver-dark-text)]">
                <span
                  className="text-[13px] 
                leading-[20px] font-normal 
                break-all overflow-hidden 
                truncate line-clamp-1
                "
                >
                  {extractDomain(url)}
                </span>
              </div>
              <div className="py-0">
                <p
                  className="text-[13px] 
                leading-[20px] font-normal 
                break-all overflow-hidden 
                truncate line-clamp-1"
                >
                  by
                </p>
              </div>
              <p
                className="text-[13px] 
              leading-[20px] font-normal 
              break-all overflow-hidden 
              truncate line-clamp-1
              "
              >
                {author}
              </p>
            </div>
          </div>
          <span
            className="text-[13px] 
          text-[var(--color-silver-dark-text)]"
          >
            {formatDateSafe(created_at)}
          </span>
        </a>
      </div>
    </div>
  );
};

export default TrendingItem;
