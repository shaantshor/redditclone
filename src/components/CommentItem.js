import CommentInput from "./CommentInput";
import { useState, useContext } from "react";
import CommentsContext from '../context';
import EditButton from "./EditButton";
import CancelButton from "./CancelButton";
import ReplyButton from "./ReplyButton";
import DeleteButton from "./DeleteButton";
import { FaMinus, FaPlus } from "react-icons/fa";

function CommentItem({ comment, level, isPost }) {

  const { comments, setComments } = useContext(CommentsContext);
  const [isReplying, setIsReplying] = useState(false);
  const [voteCount, setVoteCount] = useState(comment.voteCount || 0);
  const [isEdit, setIsEdit] = useState(false);

  const onComment = (commentToAdd) => {
    const updatedComments = updateComments(comments, comment.createdAt, commentToAdd);
    setComments(updatedComments);
    setIsReplying(false);
  };


  const updateComments = (comments, targetComment, commentToAdd) => comments.map((c) => {
    if (c.createdAt === targetComment)
      return {
        ...c,
        comments: c.comments ? [...c.comments, commentToAdd] : [commentToAdd],
      };
    else if (c.comments?.length)
      return {
        ...c,
        comments: updateComments(c.comments, targetComment, commentToAdd),
      };
    return c;
  });


  const handleEdit = (commentBody) => {
    if (commentBody.trim() !== "") {
      const updatedComments = editComment(comments, comment.createdAt, commentBody);
      setComments(updatedComments);
      setIsEdit(false);
    }

  };

  const editComment = (comments, targetComment, newMessage) =>
    comments.map((c) => {
      if (c.createdAt === targetComment)
        return {
          ...c,
          message: newMessage,
        };
      else if (c.comments?.length)
        return {
          ...c,
          comments: editComment(c.comments, targetComment, newMessage),
        };
      return c;
    });



  const handleVote = (type) => {
    setVoteCount((prevCount) =>
      type === "upvote" ? (prevCount + 1) : (prevCount - 1)
    );
  };

  return (
    <div className={`border border-zinc-400 rounded px-2 py-1 mb-4`}>
      {isPost && <div className="underline font-semibold text-lg">Post</div>}
      <span className="flex">

        <span className="mr-3 ">
          <button className="text-indigo-700 mr-1" onClick={() => handleVote("downvote")}> <FaMinus /> </button>
          {voteCount}
          <button className="text-indigo-700 ml-1" onClick={() => handleVote("upvote")}> <FaPlus /> </button>
        </span>

        <img className="w-6 h-5 mx-2" src={comment.avatar} alt="pfp" /> {comment.author}

        <span className="mx-3">Created: {comment.createdAt}</span>

        {comment.added && (
          <>
            <DeleteButton comment={comment} />
            {!isEdit ? (<EditButton setIsEdit={setIsEdit} />)
              : (<CancelButton setIsEdit={setIsEdit}/>)
            }
          </>
        )

        }

        {isReplying ? (<CancelButton setIsReplying={setIsReplying} />) : (<ReplyButton setIsReplying={setIsReplying} />)}


      </span>

      {isEdit ?
        <CommentInput defaultValue={comment.message} customOnComment={handleEdit} /> :
        <div className="my-3">{comment.message}</div>}

      {isReplying && <CommentInput onComment={onComment} />}

      {comment.comments && (
        <div className="ml-10 px-5 ">
          {/* recursion for nested comments */}
          {comment.comments.map((nestedComment) => (
            <CommentItem
              key={nestedComment.createdAt}
              comment={nestedComment}
              level={level + 1}
              isPost={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;