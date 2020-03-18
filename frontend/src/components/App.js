import React, { Component } from "react";
import { Route, Switch, Link, NavLink, Router } from "react-router-dom";
import EditStudentProfile from "./EditStudentProfile";
import Mix from "./Mix";
import SearchResult from "../page/SearchResult";
import TutorPage from "../page/TutorPage";
import Cat from "./Cat";
import Filter from "./Filter";
import NavBar from "./NavBar";
import StudentPage from "../page/StudentPage";
import NewCourse from "./NewCourse";
import EditCourse from "./EditCourse";
import CourseInformation from "../page/CourseInformation";
import Profile from "./Profile";
import Login from "./Login";
import history from "../history";
import EditCourseCardLayout from "./EditCourseCardLayout";
import RegisterPage from "../page/RegisterPage";
import PremiumPayment from "./PremiumPayment";
import DocPayment from "./DocPayment";
const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const Post = () => <h1>Post</h1>;
const Project = () => <h1>Project</h1>;
const NotFoundPage = () => <h1>404: Page Not Found</h1>;

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <NavBar loggedin={localStorage.getItem("token")} />
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={SearchResult} />
          <Route path="/profile" component={Profile} />
          <Route path="/course/edit" component={EditCourse} />
          <Route path="/course/create" component={NewCourse} />
          <Route path="/course" component={CourseInformation} />
          <Route path="/premiumPayment" component={PremiumPayment} />
          <Route path="/DocPayment" component={DocPayment} />
        </Switch>
      </Router>
    );
  }
}

export default App;
