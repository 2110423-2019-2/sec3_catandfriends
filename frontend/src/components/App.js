import React from "react";
import { Router, Route } from "react-router-dom";

import history from "../history";
import Topbar from "./TopBar";
import CourseCard from "./CourseCard";
import EditableCardLayout from "./EditableCardLayout";
import EditCourse from "./EditCourse";
import NewCourse from "./NewCourse";
import RequestScrollBar from "./RequestScrollBar";
import "./App.css";


const App = () => {
  return (
    <div className="App">
      <Topbar/>
      <CourseCard/>
      <EditableCardLayout/>
      <EditCourse/>
      <NewCourse/>
      <RequestScrollBar/>
    </div>
  );
};

export default App;