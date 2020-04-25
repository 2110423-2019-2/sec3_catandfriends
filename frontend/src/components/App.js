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
  constructor(props) {
    super(props);

    this.state = { data: {} };
  }

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
          <Route
            path="/profile/verify"
            component={
              !this.state.isVerifiedTutor
                ? this.getPage(VerifyPage)
                : PageNotFound
            }
          />
          <Route
            path="/profile/premium"
            component={
              this.state.isVerifiedTutor
                ? this.getPage(PremiumPage)
                : PageNotFound
            }
          />
          <Route path="/profile" component={Profile} />
          <Route
            path="/course/edit"
            component={
              this.state.isVerifiedTutor
                ? this.getPage(EditCourse)
                : PageNotFound
            }
          />
          <Route
            path="/course/create"
            component={
              this.state.isVerifiedTutor
                ? this.getPage(NewCourse)
                : PageNotFound
            }
          />
          <Route path="/course" component={this.getPage(CourseInformation)} />
          <Route path="/mycourse" component={this.getPage(MyCourse)} />
          <Route path="/home" component={this.homePage()} />
          <Route path exact="/" component={this.homePage()} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
  async componentDidMount() {
    let data = await Util.getProfile();
    this.setState({ data: data });
    this.setState({ isTutor: data && data.role == "tutor" });
    this.setState({ isStudent: data && data.role == "student" });
    this.setState({
      isVerifiedTutor: data && data.role == "tutor" && data.verifyStatus,
    });
  }
}

export default App;
