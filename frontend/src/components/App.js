import React, { Component } from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import EditStudentProfile from "./EditStudentProfile";
import VerifyCard from "./VerifyCard";
const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const Post = () => <h1>Post</h1>;
const Project = () => <h1>Project</h1>;
const NotFoundPage = () => <h1>404: Page Not Found</h1>;

class App extends Component {
  render() {
    return (
      <div className="my-app">
        <nav
          className="navbar is-light"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item" to="https://devahoy.com">
                <img
                  src="https://devahoy.com/assets/images/devahoy-text-logo.png"
                  alt="DEVAHOY LOGO"
                  width="112"
                  height="28"
                />
              </Link>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <NavLink
                  exact
                  to="/"
                  activeClassName="is-active"
                  className="navbar-item"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/post"
                  activeClassName="is-active"
                  className="navbar-item"
                >
                  Posts
                </NavLink>
                <NavLink
                  to="/verify"
                  activeClassName="is-active"
                  className="navbar-item"
                >
                  Verify
                </NavLink>
                <NavLink
                  to="/about"
                  activeClassName="is-active"
                  className="navbar-item"
                >
                  About
                </NavLink>
                <NavLink
                  to="/editstudentform"
                  activeClassName="is-active"
                  className="navbar-item"
                >
                  Edit Profile
                </NavLink>
                <a
                  className="navbar-item"
                  href="https://github.com/phonbopit"
                  target="_blank"
                >
                  Star on <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div className="App container">
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/post" component={Post} />
          <Route path="/verify" component={VerifyCard} />
          <Route path="/editstudentform" component={EditStudentProfile} />
        </div>
      </div>
    );
  }
}

export default App;
