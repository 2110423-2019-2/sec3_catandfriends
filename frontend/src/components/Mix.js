import React, { Component } from "react";

import TuProfile from "./TutorProfile";
import CDetail from "./CourseDetail";
import Navbar from "./NavBar";
import StuCProfile from "./StudentCTuProfile";

export default class Mix extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <CDetail />
        <StuCProfile />
        <TuProfile />
      </div>
    );
  }
}
