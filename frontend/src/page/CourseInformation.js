import React, { Component } from "react";
import CourseDetail from "../components/CourseDetail";
import TutorCard from "../components/TutorCard";
import Comment from "../components/Comment";
export default class CourseInformation extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <div className="row justify-content-center">
          <TutorCard />
          <CourseDetail />
        </div>
        <div className="row justify-content-center"></div>
      </div>
    );
  }
}
