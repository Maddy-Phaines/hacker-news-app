import CommentCard from "./CommentCard";

export default function CommentThread({ comments, depth = 0, authorInt }) {
  if (!comments || comments.length === 0) return null;
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
}
