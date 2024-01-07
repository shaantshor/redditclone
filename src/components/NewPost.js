import CommentInput from "./CommentInput";


function NewPost({ setComments }) {
  const onComment = (commentBody) => {

    if(commentBody.trim()!==""){

      const newComment = {
        author: "new user",
        createdAt: new Date().toISOString(),
        message: commentBody,
        voteCount: 0,
        avatar: "https://robohash.org/1",
        comments: [],
        added: true,
      };
  
      setComments((prevComments) => [...prevComments, newComment]);
    };
    }

  return (
    <>
      <span className="underline font-semibold text-lg">
        New Post:
      </span>
      <CommentInput customOnComment={onComment} />

    </>

  );
}

export default NewPost;