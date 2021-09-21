import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "Pages/Home";
import Stat from "Pages/Stat";
import Planner from "Pages/Planner";
import Group from "Pages/Group";
import Rank from "Pages/Rank";
import Login from "Pages/Login";
import Register from "Pages/Register";

import Nav from "Components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/stat">
          <Stat />
        </Route>
        <Route path="/planner">
          <Planner />
        </Route>
        <Route path="/group">
          <Group />
        </Route>
        <Route path="/rank">
          <Rank />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
