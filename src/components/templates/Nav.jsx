import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";

export default props => (
  <aside className="menu-area">
    <nav className="menu">
      <Link to="/">
        <i className="fa fa-home" /> Home
      </Link>
      <Link to="/account">
        <i className="fa fa-users" /> Accounts
      </Link>
    </nav>
  </aside>
);
