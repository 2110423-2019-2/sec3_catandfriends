import React from "react";
import { Router, Route } from "react-router-dom";

import history from "../history";
import Dummy from "./Dummy";
import "./App.css";


const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={Dummy}/>
      </Router>
    </div>
  );
};

export default App;