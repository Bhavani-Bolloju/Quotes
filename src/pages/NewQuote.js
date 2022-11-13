import React, { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../components/hooks/use-http";
import { addQuote } from "../components/lib/api";

function NewQuote() {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/allQuotes");
    }
  }, [status, history]);

  const newQuoteHandler = function (data) {
    sendRequest(data);
  };

  return (
    <div>
      <QuoteForm
        onAddQuote={newQuoteHandler}
        isLoading={status === "pending"}
      />
    </div>
  );
}

export default NewQuote;
