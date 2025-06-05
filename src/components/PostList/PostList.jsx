/* Receives array of posts, renders list */
/* Reusable for homepage & search */
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div className="">
      {posts.map((post) => (
        <PostItem
          key={post.objectID}
          title={post.title}
          author={post.author}
          url={post.url}
          points={post.points}
          num_comments={post.num_comments}
          created_at={post.created_at}
        />
      ))}
    </div>
  );
};

export default PostList;
