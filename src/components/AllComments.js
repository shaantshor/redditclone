import React from "react";
import CommentItem from "./CommentItem";

const AllComments = ({ comments, level }) => {
  return (
    <div>
      {comments.map(comment => (
        <CommentItem key={comment.createdAt} comment={comment} level={level} isPost={level === 0} />
      ))}
    </div>
  )
};

export default AllComments;
