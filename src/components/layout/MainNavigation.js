import React from "react";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>Quotes</h1>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/allQuotes" activeClassName={classes.active}>
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to="/newQuotes" activeClassName={classes.active}>
              New Quotes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
