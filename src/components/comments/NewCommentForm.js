import { useRef, useEffect } from "react";
import useHttp from "../hooks/use-http";
import classes from "./NewCommentForm.module.css";
import { addComment } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { id, onAddingComment } = props;
  const { error, status, sendRequest } = useHttp(addComment);

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddingComment();
    }
  }, [status, error, onAddingComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    sendRequest({ commentData: { text: enteredText }, quoteId: id });

    commentTextRef.current.value = "";
  };

  if (status === "pending") {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
