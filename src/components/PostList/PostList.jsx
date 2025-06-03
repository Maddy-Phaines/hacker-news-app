/* Receives array of posts, renders list */
/* Reusable for homepage & search */
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.objectID} post={post} />
      ))}
    </div>
  );
};

export default PostList;
