import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  // console.log(props.isLoading);

  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [entered, setEntered] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (enteredAuthor.trim().length === 0 || enteredText.trim().length === 0) {
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const leavePageHandler = function () {
    setEntered(false);
  };

  const enteredHandler = function () {
    setEntered(true);
  };

  return (
    <>
      <Prompt
        when={entered}
        message={() => "You sure want to leave the page"}
      />
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input
              onFocus={enteredHandler}
              type="text"
              id="author"
              ref={authorInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea
              onFocus={enteredHandler}
              id="text"
              rows="5"
              ref={textInputRef}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={leavePageHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
