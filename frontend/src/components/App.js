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

  notlogin = () => {
    return !localStorage.getItem("token");
  };
  tutor = () => {
    if (localStorage.getItem("token")) {
      return localStorage.getItem("role") == "tutor";
    } else {
      return false;
    }
  };
  verifiedTuror() {
    if (this.tutor()) {
      // let data = await Util.getProfile();
      // let isVerified = await data.verifyStatus;
      return this.state.verifiedTuror;
    }
    // http://localhost:3000/course/edit?courseId=5ea44d4934a53e043877906d
    return false;
  }
  user = () => {
    return localStorage.getItem("token");
  };
  student = () => {
    if (localStorage.getItem("token")) {
      return localStorage.getItem("role") == "student";
    } else {
      return false;
    }
  };
  render() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
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
  renderReal() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
          {this.notlogin() && <Route path="/login" component={Login} />}
          {this.notlogin() && <Route path="/home" component={Home} />}
          {this.notlogin() && <Route path exact="/" component={Home} />}
          {this.student() && <Route path="/chat" component={Chatbox} />}
          {this.verifiedTuror() && <Route path="/chat" component={Chatbox} />}
          {this.tutor() && !this.verifiedTuror() && (
            <Route path="/profile/verify" component={VerifyPage} />
          )}
          {this.verifiedTuror() && (
            <Route path="/profile/premium" component={PremiumPage} />
          )}
          {this.verifiedTuror() && (
            <Route path="/course/create" component={NewCourse} />
          )}
          {this.verifiedTuror() && (
            <Route path="/course/edit" component={EditCourse} />
          )}
          {this.user() && (
            <Route path="/profile/edit" component={EditProfile} />
          )}
          {this.user() && <Route path="/profile" component={Profile} />}
          {this.user() && (
            <Route path="/course" component={CourseInformation} />
          )}
          {this.verifiedTuror() && (
            <Route path="/mycourse" component={MyCourse} />
          )}
          {this.student() && <Route path="/mycourse" component={MyCourse} />}
          {this.user() && <Route path="/home" component={SearchResult} />}
          {this.user() && <Route path exact="/" component={SearchResult} />}
          <Route path="/pagenotfound" component={PageNotFound} />
          {/* {this.tutor() && !this.verifiedTuror() && (
            <Route path="/mycourse" component={VerifyFirst} />
          )}
          {this.tutor() && !this.verifiedTuror() && (
            <Route path="/chat" component={VerifyFirst} />
          )} */}
          <Route path="/blank" component={Home} />
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
