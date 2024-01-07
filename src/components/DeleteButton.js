import { useContext, useState } from "react";
import CommentsContext from "../context";
import Modal from "./Modal";

function DeleteButton({ comment }) {
  const { comments, setComments } = useContext(CommentsContext);
  const [isOpen, setIsOpen] = useState(false);

  const confirmDelete = () => {
    setIsOpen(false);

    const deleteCommentAndNested = (comments, commentToDelete) => {
      return comments
        .filter((c) => c.createdAt !== commentToDelete.createdAt)
        .map((c) => {
          if (c.comments) {
            c.comments = deleteCommentAndNested(c.comments, commentToDelete);
          }
          return c;
        });
    };

    const updatedComments = deleteCommentAndNested(comments, comment);
    setComments(updatedComments);
    
  };

  return (
    <>
      <button
        className="mx-5 text-red-500 hover:text-red-400 font-bold rounded"
        onClick={()=> setIsOpen(true)}
      >
        Delete
      </button>
      {isOpen && (      
      <Modal open={isOpen} setIsOpen={setIsOpen} onConfirm={confirmDelete}>
        <h2 className="text-lg ">
            Delete Comment
        </h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
      </Modal>)}

    </>
  );
}

export default DeleteButton;
