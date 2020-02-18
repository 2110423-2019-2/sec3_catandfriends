import React, { Component } from "react";
import TutorProfile from "../components/TutorProfile";
import VerifyCard from "../components/VerifyCard";
import RequestScrollBar from "../components/RequestScrollBar";
import CourseCardLayout from "../components/CourseCardLayout";
import StudentCTuProfile from "../components/StudentCTuProfile";
export default class SCTutorPage extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <div className="row justify-content-center">
          <StudentCTuProfile />
        </div>
        <div className="row justify-content-center">
          <CourseCardLayout />
        </div>
      </div>
    );
  }
}
