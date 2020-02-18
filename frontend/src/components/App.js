import React, { Component } from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import EditStudentProfile from "./EditStudentProfile";
import Mix from "./Mix";
import SearchResult from "../page/SearchResult";
import TutorPage from "../page/TutorPage";
import Cat from "./Cat";
import Filter from "./Filter";
import NavBar from "./NavBar";
import StudentPage from "../page/StudentPage";
import CourseInformation from "../page/CourseInformation";
import EditCourseCardLayout from "./EditCourseCardLayout"
const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const Post = () => <h1>Post</h1>;
const Project = () => <h1>Project</h1>;
const NotFoundPage = () => <h1>404: Page Not Found</h1>;

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchResult} />
        <Route path="/tutor" component={TutorPage} />
        <Route path="/student" component={StudentPage} />
        <Route path="/course" component={EditCourseCardLayout} />
      </div>
    );
  }
}

export default App;
