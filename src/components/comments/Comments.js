import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const {
    sendRequest,
    status,
    error,
    data: loadedData,
  } = useHttp(getAllComments);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addingCommentHandler = useCallback(
    function () {
      sendRequest(id);
    },
    [sendRequest, id]
  );

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && (!loadedData || loadedData.length === 0)) {
    comments = <p className="centered">No comments found</p>;
  }

  if (error) {
    comments = <p className="centered">{error}</p>;
  }

  if (status === "completed" && loadedData.length > 0) {
    comments = <CommentsList comments={loadedData} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onAddingComment={addingCommentHandler} id={id} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
