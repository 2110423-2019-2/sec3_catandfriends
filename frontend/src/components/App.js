import React, { Component } from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import EditStudentProfile from "./EditStudentProfile";
import Mix from "./Mix";
import SearchResult from "../page/SearchResult";
import TutorPage from "../page/TutorPage";
import SCTutorPage from "../page/SCTutorPage";
import Cat from "./Cat";
import Filter from "./Filter";
import NavBar from "./NavBar";
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
        <Route path="/mytutorprofile" component={TutorPage} />
        <Route path="/tutor" component={SCTutorPage} />
        <Route path="/cat" component={Cat} />
      </div>
    );
  }
}

export default App;
