/* Recursive component to display nested comments */
/* Key for post detail view */
import CommentCard from "../CommentCard";
const CommentThread = ({ comments, depth = 0, authorInt }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          depth={depth}
          authorInt={authorInt}
        />
      ))}
    </>
  );
};

export default CommentThread;
