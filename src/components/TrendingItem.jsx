// preview of trending stories
import { formatDateSafe } from "../utils/formatDate";
import { extractDomain } from "../utils/extractDomain";
/* .wa {
    margin-bottom: 12px;
}

.ac {
    display: flex
;
}
.r {
    align-items: center;
}
   div of favicon: .ada {
    margin-right: 8px;
    display: block

 div of domain span: 
 display: block
 padding-right: 4px

 div of 'by' p:
 .add {
    padding: 0px 4px;
}

.m {
    display: block;
}

    */
const TrendingItem = ({ title, author, url, created_at, objectId }) => {
  return (
    <div className="mb-5">
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
        <h2 className="text-sm font-semibold text-gray-900 leading-snug">
          {title}
        </h2>

        <span className="text-xs text-gray-400">
          {formatDateSafe(created_at)}
        </span>
      </a>
    </div>
  );
};

export default TrendingItem;
