// preview of trending stories
import { formatDateSafe } from "../utils/formatDate";
import { extractDomain } from "../utils/extractDomain";

const TrendingItem = ({ title, author, url, created_at, objectId }) => {
  return (
    <div className="block pb-5">
      <div className="w-full h-full">
        <a href={url} className="flex flex-col gap-1">
          <div className="flex items-center mb-3">
            <div className="block mr-2">
              {url && (
                <img
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`}
                  alt="Favicon"
                  className="w-5 h-5"
                />
              )}
            </div>
            <div className="text-xs text-gray-500 flex gap-1">
              <div className="block pr-1">
                <span className="text-[13px] leading-[20px] font-normal text-[#242424] break-all overflow-hidden truncate line-clamp-1">
                  {extractDomain(url)}
                </span>
              </div>
              <div className="py-0">
                <p className="text-[13px] leading-[20px] font-normal text-[#242424] break-all overflow-hidden truncate line-clamp-1">
                  by
                </p>
              </div>
              <p className="text-[13px] leading-[20px] font-normal text-[#242424] break-all overflow-hidden truncate line-clamp-1">
                {author}
              </p>
            </div>
          </div>
          <h2
            className="font-sohne
    text-[#242424]
    font-bold
    text-base leading-6
    truncate overflow-hidden
    m-0
    mdplus:text-[24px]
    mdplus:leading-[30px]
    mdplus:max-h-[90px]
    mdplus:tracking-[-0.016em]
    mdplus:line-clamp-3"
          >
            {title}
          </h2>

          <span className="text-[13px] text-gray-400">
            {formatDateSafe(created_at)}
          </span>
        </a>
      </div>
    </div>
  );
};

export default TrendingItem;
