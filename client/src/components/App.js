import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import DestinationsIndex from "./layout/DestinationsIndex";
import NewDestinationForm from "./layout/NewDestinationForm";
import DestinationShow from "./layout/DestinationShow";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import NewReviewForm from "./layout/NewReviewForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={DestinationsIndex} />
<<<<<<< HEAD
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
=======
        <AuthenticatedRoute exact path="/destinations/:id/new-review" component={NewReviewForm} user={currentUser}/>
>>>>>>> e50b4b83eb7282a30e94f404fd7dab70c275b98a
        <Route exact path="/destinations/new" component={NewDestinationForm} />
         <AuthenticatedRoute exact path="/destinations/:id/new-review" component={NewReviewForm} user={currentUser}/>
        <Route exact path="/destinations/:id" component={DestinationShow} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
