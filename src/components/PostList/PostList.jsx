/* Receives array of posts, renders list */
/* Reusable for homepage & search */
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div>
      <div className="pt-1 md:pt-4"></div>
      <div>
        {posts.map((post) => (
          <PostItem
            key={post.objectID}
            objectID={post.objectID}
            title={post.title}
            author={post.author}
            url={post.url}
            points={post.points}
            num_comments={post.num_comments}
            created_at={post.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
