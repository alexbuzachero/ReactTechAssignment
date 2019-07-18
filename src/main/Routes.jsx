import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Home from "../components/pages/Home";
import Account from "../components/pages/Account";

export default props => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/account" component={Account} />
    <Redirect from="*" to="/" />
  </Switch>
);
