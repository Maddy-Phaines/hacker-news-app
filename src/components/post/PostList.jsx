/* Receives array of posts, renders list */
/* Reusable for homepage & search */
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div>
      <div className="md:pt-4"></div>
      <div>
        {posts.map((post, index) => (
          <div
            key={post.objectID}
            className="flex flex-col gap-2
            shadow-[var(--shadow-below)] 
            "
          >
            <PostItem
              key={post.objectID}
              objectID={post.objectID}
              title={post.title}
              author={post.author}
              url={post.url}
              points={post.points}
              num_comments={post.num_comments}
              created_at={post.created_at}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
