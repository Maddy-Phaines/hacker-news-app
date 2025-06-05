import TrendingItem from "./TrendingItem";

const TrendingList = ({ trendingPosts }) => {
  return (
    <div>
      {trendingPosts.map((post) => (
        <TrendingItem
          key={post.objectID}
          title={post.title}
          author={post.author}
          url={post.url}
          created_at={post.created_at}
        />
      ))}
    </div>
  );
};

export default TrendingList;
