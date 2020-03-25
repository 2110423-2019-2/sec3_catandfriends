import React, { Component } from "react";
import { Route, Switch, Link, NavLink, Router } from "react-router-dom";
import "./App.css";
import SearchResult from "../page/SearchResult";
import NavBar from "./NavBar";
import NewCourse from "./NewCourse";
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
const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const Post = () => <h1>Post</h1>;
const Project = () => <h1>Project</h1>;
const NotFoundPage = () => <h1>404: Page Not Found</h1>;

class App extends Component {
  getPage(page) {
    if (!localStorage.getItem("token")) {
      return PageNotFound;
    } else {
      return page;
    }
  }
  render() {
    return (
      <Router history={history}>
        <NavBar />
        <div className="TS">
          <Switch>
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={this.getPage(SearchResult)} />
            <Route path="/profile/edit" component={this.getPage(EditProfile)} />
            <Route
              path="/profile/verify"
              component={this.getPage(VerifyPage)}
            />
            <Route
              path="/profile/premium"
              component={this.getPage(PremiumPage)}
            />
            <Route path="/profile" component={this.getPage(Profile)} />
            <Route path="/course/edit" component={this.getPage(EditCourse)} />
            <Route path="/course/create" component={this.getPage(NewCourse)} />
            <Route path="/course" component={this.getPage(CourseInformation)} />
            <Route path="/mycourse" component={this.getPage(MyCourse)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
