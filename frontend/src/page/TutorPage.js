import React, { Component } from "react";
import TutorProfile from "../components/TutorProfile";
import VerifyCard from "../components/VerifyCard";
import RequestScrollBar from "../components/RequestScrollBar";
import EditCourseCardLayout from "../components/EditCourseCardLayout";
import CourseCardLayout from "../components/CourseCardLayout";
import StudentCTuProfile from "../components/StudentCTuProfile";
export default class TutorPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.owner) {
      return (
        <div className="justify-content-center">
          <div className="row justify-content-center">
            <TutorProfile data={this.props.data} />
          </div>
          <div className="row justify-content-center">
            <VerifyCard />
            <RequestScrollBar />
            <EditCourseCardLayout />
          </div>
        </div>
      );
    } else {
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
}
