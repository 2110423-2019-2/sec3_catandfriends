import React, { Component } from "react";
import { Route, Switch, Redirect, NavLink, Router } from "react-router-dom";
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
import Util from "../apis/Util";
import { ThemeConsumer } from "styled-components";
// import LogInFirst from "./LogInFirst";
const About = () => <h1>About</h1>;
const LogInFirst = () => {
  // alert("Please Log in first");
  history.push("/login");
  return <div></div>;
};
const LogInAlready = () => {
  // alert("You are already logged in");
  history.push("/profile");
  return <div></div>;
};
const VerifyFirst = () => {
  window.alert("You have to verify first");
  // history.push("/profile");
  return <Profile />;
};
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: {} };
  }
  loggedIn() {
    return localStorage.getItem("token");
  }
  tutor() {
    return localStorage.getItem("role") == "tutor";
  }
  verifiedTutor() {
    return localStorage.getItem("role") == "verifiedTutor";
  }
  student() {
    return localStorage.getItem("role") == "student";
  }
  premiumTutor() {
    return localStorage.getItem("premium") == "yes";
  }
  render3() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/chat">
            {this.verifiedTutor() || this.student() ? (
              <Chatbox />
            ) : this.tutor() ? (
              <Redirect to="/profile" />
            ) : (
              <PageNotFound />
            )}
          </Route>
          <Route path="/login">
            {this.loggedIn() ? <Redirect to="/profile" /> : <Login />}
          </Route>
          <Route path="/profile/edit" component={EditProfile} />
          <Route path="/profile/verify" component={VerifyPage} />
          <Route path="/profile/premium" component={PremiumPage} />
          <Route path="/profile">
            {this.loggedIn() ? <Profile /> : <Login />}
          </Route>
          <Route path="/course/edit" component={EditCourse} />
          <Route path="/course/create" component={NewCourse} />
          <Route path="/course" component={CourseInformation} />
          <Route path="/mycourse" component={MyCourse} />
          <Route path="/search" component={SearchResult} />
          <Route path="/home">
            {this.loggedIn() ? (
              <Redirect to="/search" />
            ) : (
              <Redirect to="/signup" />
            )}
          </Route>{" "}
          <Route path="/signup">
            {this.loggedIn() ? <Profile /> : <Home />}
          </Route>
          <Route path exact="/" component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
  render() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
          {!this.loggedIn() && <Route path="/login" component={Login} />}
          {this.loggedIn() && <Route path="/home" component={SearchResult} />}
          {!this.loggedIn() && <Route path="/home" component={Home} />}
          {/* {!this.loggedIn() && <Route path exact="/" component={Home} />} */}
          {this.student() && <Route path="/chat" component={Chatbox} />}
          {this.verifiedTutor() && <Route path="/chat" component={Chatbox} />}
          {this.tutor() && !this.verifiedTutor() && (
            <Route path="/profile/verify" component={VerifyPage} />
          )}
          {this.verifiedTutor() && !this.premiumTutor() && (
            <Route path="/profile/premium" component={PremiumPage} />
          )}
          {this.verifiedTutor() && (
            <Route path="/course/create" component={NewCourse} />
          )}
          {this.verifiedTutor() && (
            <Route path="/course/edit" component={EditCourse} />
          )}
          {this.loggedIn() && (
            <Route path="/profile/edit" component={EditProfile} />
          )}
          {this.loggedIn() && <Route path="/profile" component={Profile} />}
          {this.loggedIn() && (
            <Route path="/course" component={CourseInformation} />
          )}
          {this.verifiedTutor() && (
            <Route path="/mycourse" component={MyCourse} />
          )}
          {this.student() && <Route path="/mycourse" component={MyCourse} />}

          {this.loggedIn() && <Route path exact="/" component={SearchResult} />}
          <Route path="/pagenotfound" component={PageNotFound} />
          {/* {this.tutor() && !this.verifiedTuror() && (
            <Route path="/mycourse" component={VerifyFirst} />
          )}
          {this.tutor() && !this.verifiedTuror() && (
            <Route path="/chat" component={VerifyFirst} />
          )} */}
          {!this.loggedIn() && <Route path="/signup" component={Home} />}
          {!this.loggedIn() && <Route exact path="/" component={Home} />}
        </Switch>
      </Router>
    );
  }
  render2() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
          {/* <Route
              path="/register"
              component={this.alreadylogin(RegisterPage)}
            /> */}
          {/* <Route path="/search" component={this.getPage(SearchResult)} /> */}

          <Route path="/chat" component={Chatbox} />
          <Route path="/login" component={Login} />
          <Route path="/profile/edit" component={EditProfile} />
          <Route path="/profile/verify" component={VerifyPage} />
          <Route path="/profile/premium" component={PremiumPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/course/edit" component={EditCourse} />
          <Route path="/course/create" component={NewCourse} />
          <Route path="/course" component={CourseInformation} />
          <Route path="/mycourse" component={MyCourse} />
          <Route path="/home" component={Home} />
          <Route path exact="/" component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
