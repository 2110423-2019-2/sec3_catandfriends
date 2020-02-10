import React from "react";
import { Router, Route } from "react-router-dom";

import history from "../history";
import Topbar from "./TopBar";
import Home from "./Home";
import Search from "./Search";
import Course from "./Course";
import Profile from "./Profile";
import "./App.css";


const App = () => {
  return (
    <div className="App">
      <Topbar/>
      <Router history={history}>
        <Route path="/" exact component={Home}/>
        <Route path="/search" component={Search}/>
        <Route path="/courses" component={Course}/>
        <Route path="/profile" component={Profile}/>
      </Router>
    </div>
  );
};

export default App;