import React, { Component } from "react";
import { Route, Switch, Link, NavLink, Router } from "react-router-dom";
import "./App.css";
import SearchResult from "../page/SearchResult";
import NavBar from "./NavBar";
import NewCourse from "./NewCourse";
import Home from "./Home.js";
import EditCourse from "./EditCourse";
import CourseInformation from "../page/CourseInformation";
import Profile from "./Profile";
import Login from "./Login";
import history from "../history";
import RegisterPage from "../page/RegisterPage";
import EditProfile from "../page/EditProfile";
import MyCourse from "../page/MyCourse";
import VerifyPage from "../page/VerifyPage";
import PremiumPage from "../page/PremiumPage";
import PageNotFound from "../page/PageNotFound";
import Chatbox from "./Chatbox";

// import LogInFirst from "./LogInFirst";
const About = () => <h1>About</h1>;
const LogInFirst = () => {
  alert("Please Log in first");
  history.push("/login");
  return <div></div>;
};
const LogInAlready = () => {
  alert("You are already logged in");
  history.push("/profile");
  return <div></div>;
};

class App extends Component {
  getPage(page) {
    if (!localStorage.getItem("token")) {
      return LogInFirst;
    } else {
      return page;
    }
  }
  alreadylogin(page) {
    if (!localStorage.getItem("token")) {
      return page;
    } else {
      return LogInAlready;
    }
  }
  homePage() {
    if (!localStorage.getItem("token")) {
      return Home;
    } else {
      return SearchResult;
    }
  }

  render() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
          {/* <Route
              path="/register"
              component={this.alreadylogin(RegisterPage)}
            /> */}
          <Route path="/chat" component={this.getPage(Chatbox)} />
          <Route path="/login" component={this.alreadylogin(Login)} />
          {/* <Route path="/search" component={this.getPage(SearchResult)} /> */}
          <Route path="/profile/edit" component={this.getPage(EditProfile)} />
          <Route path="/profile/verify" component={this.getPage(VerifyPage)} />
          <Route
            path="/profile/premium"
            component={this.getPage(PremiumPage)}
          />
          <Route path="/profile" component={Profile} />
          <Route path="/course/edit" component={this.getPage(EditCourse)} />
          <Route path="/course/create" component={this.getPage(NewCourse)} />
          <Route path="/course" component={this.getPage(CourseInformation)} />
          <Route path="/mycourse" component={this.getPage(MyCourse)} />
          <Route path="/home" component={this.homePage()} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;