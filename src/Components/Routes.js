import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Upload from "../Routes/Upload";
import Home from "../Routes/Home";
import Auth from "../Routes/Auth";
import Profile from "../Routes/Profile";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route exact path="/upload" render={() => <Upload />} />
    <Route exact path="/profile" render={() => <Profile />} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" render={() => <Auth />} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => {
  return <>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</>;
};
export default AppRouter;
