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
import CourseInformation from "../page/CourseInformation";
<<<<<<< HEAD
import Profile from "./Profile";
import history from "../history";
||||||| merged common ancestors
=======
import EditCourseCardLayout from "./EditCourseCardLayout"
>>>>>>> 3e054f1f812ece188667fddab0e77802a7e14134
const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const Post = () => <h1>Post</h1>;
const Project = () => <h1>Project</h1>;
const NotFoundPage = () => <h1>404: Page Not Found</h1>;

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/search" component={SearchResult} />
          <Route path="/profile" component={Profile} />>
          <Route path="/course" component={CourseInformation} />
        </Switch>
      </Router>
    );
  }
}

export default App;
