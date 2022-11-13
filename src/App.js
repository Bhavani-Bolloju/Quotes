import { Redirect, Route, Switch } from "react-router-dom";
// import { lazy, Suspense } from "react";
import React from "react";

import Layout from "./components/layout/Layout";
import DetailQuote from "./pages/DetailQuote";
import NewQuote from "./pages/NewQuote";

import MainNavigation from "./components/layout/MainNavigation";
import AllQuotes from "./pages/AllQuotes";

// const Layout = lazy(() => import("./components/layout/Layout"));
// const DetailQuote = lazy(() => import("./pages/DetailQuote"));
// const NewQuote = lazy(() => import("./pages/NewQuote"));
// const MainNavigation = lazy(() => import("./components/layout/MainNavigation"));
// const AllQuotes = lazy(() => import("./pages/AllQuotes"));
// const LoadingSpinner = lazy(() => import("./components/UI/LoadingSpinner"));

function App() {
  return (
    // <Suspense
    //   fallback={
    //     <div className="centered">
    //       <LoadingSpinner />
    //     </div>
    //   }
    // >
    <>
      <main>
        <MainNavigation />
      </main>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/allQuotes" />
          </Route>
          <Route path="/allQuotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/allQuotes/:id">
            <DetailQuote />
          </Route>
          <Route path="/newQuotes">
            <NewQuote />
          </Route>
          <Route path="*">
            <p className="centered">Page Not Found</p>
          </Route>
        </Switch>
      </Layout>
      {/* // </Suspense> */}
    </>
  );
}

export default App;
