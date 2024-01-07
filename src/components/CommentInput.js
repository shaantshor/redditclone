import { useState } from "react";

function CommentInput({ onComment, customOnComment, defaultValue }) {
  const [commentBody, setCommentBody] = useState(defaultValue || "");

  const handleComment = (e) => {
    e.preventDefault();

    if (commentBody.trim() !== "") {

      const newComment = {
        author: "new user",
        createdAt: new Date().toISOString(),
        message: commentBody,
        voteCount: 0,
        avatar: "https://robohash.org/1",
        comments: [],
        added: true,
      }

      if (customOnComment) {
        customOnComment(commentBody);
      } else {
        onComment(newComment);
      }

      setCommentBody("");
    }

  };

  return (
    <form onSubmit={handleComment}>
      <span className="flex items-center mb-2">
        <input
          placeholder=" Hi, what are your thoughts?"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          className="border rounded border-zinc-600  w-full mr-5"
        />
        <button
          onClick={handleComment}
          className="m-1 bg-indigo-600 hover:bg-indigo-400 text-white font-bold px-3 py-1 rounded text-sm"
        >
          Send
        </button>
      </span>
    </form>
  );
}

export default CommentInput;
