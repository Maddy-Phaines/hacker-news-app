// preview of trending stories
import { formatDateSafe } from "../utils/formatDate";

const TrendingItem = ({ title, author, url, created_at, objectId }) => {
  return (
    <div>
      <a href={url} className="flex items-center">
        {url && (
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`}
            alt="Favicon"
            className="w-5 h-5 mr-2"
          />
        )}
        <div>
          <h2>{title}</h2>
          <h3>by {author}</h3>
          <span>{formatDateSafe(created_at)}</span>
        </div>
      </a>
    </div>
  );
};

export default TrendingItem;
