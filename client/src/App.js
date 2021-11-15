import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from '_hoc/auth';

import Nav from 'Components/NavRouter';

const Active = lazy(() => import('Pages/Active'));
const Home = lazy(() => import('Pages/Home'));
const Stat = lazy(() => import('Pages/Stat'));
const Planner = lazy(() => import('Pages/Planner'));
const Group = lazy(() => import('Pages/Group'));
const Rank = lazy(() => import('Pages/Rank'));
const Login = lazy(() => import('Pages/Login'));
const Register = lazy(() => import('Pages/Register'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Auth(Home, true)} />
          <Route exact path="/active" component={Auth(Active, true)} />
          <Route path="/stat" component={Auth(Stat, true)} />
          <Route path="/planner" component={Auth(Planner, true)} />
          <Route path="/group" component={Auth(Group, true)} />
          <Route path="/rank" component={Auth(Rank, true)} />
          <Route path="/login" component={Auth(Login, false)} />
          <Route path="/register" component={Auth(Register, false)} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
