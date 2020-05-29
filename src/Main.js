import React, { Component, useState, useEffect, useRef } from "react";
import App from "./App";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./Routes/Routes";

function Main() {
  return (
    <Router>
      <div>
        <Switch>
          <Route initial={true} exact path={ROUTES.HOME} component={App} />
          <Route exact path={ROUTES.PRINCIPAL} component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
