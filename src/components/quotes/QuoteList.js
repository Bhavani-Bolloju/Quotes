import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryObj = new URLSearchParams(location.search);
  const param = queryObj.get("sort");
  const isExistingParam = param === "asc";

  const sortData = sortQuotes(props.quotes, param === "asc");

  const sortingHandler = function () {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isExistingParam ? "desc" : "asc"}`,
    });
  };

  // history.push(
  //   `${location.pathname}?sort=${param === "asc" ? "desc" : "asc"}`
  // );

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>
          {param ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortData.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
