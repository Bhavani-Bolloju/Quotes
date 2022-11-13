import React, { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../components/hooks/use-http";
import { getAllQuotes } from "../components/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

function AllQuotes() {
  const {
    sendRequest,
    error,
    status,
    data: loadedData,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if ((status === "completed" && !loadedData) || loadedData.length === 0) {
    return (
      <div>
        <NoQuotesFound />
      </div>
    );
  }

  return <QuoteList quotes={loadedData} />;
}

export default AllQuotes;
