import React, { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

import useHttp from "../components/hooks/use-http";
import { getSingleQuote } from "../components/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// import CommentsList from "../components/comments/CommentsList";

function DetailQuote() {
  const params = useParams();

  const { id } = params;

  const match = useRouteMatch();

  const {
    sendRequest,
    error,
    status,
    data: loadedData,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(id);
  }, [id, sendRequest]);

  // if (!loadedData) {
  //   return <p className="centered">No quote Exits</p>;
  // }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedData) {
    return <p className="centered">No quote found</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <HighlightedQuote text={loadedData.text} author={loadedData.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            open comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
}

export default DetailQuote;
