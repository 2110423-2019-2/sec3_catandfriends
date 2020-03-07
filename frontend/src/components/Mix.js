import React, { Component } from "react";
import StudentCTutor from "./StudentCTuProfile";
import TutorProfile from "./TutorProfile";
import Course from "./CourseDetail";
import Nav from "./NavBar";
import Edit from "./EditTutorProfile";

export class Mix extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Course />
        <StudentCTutor />
        <TutorProfile />
        <Edit />
      </div>
    );
  }
}

export default Mix;
