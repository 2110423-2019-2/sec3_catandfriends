import React, { Component } from "react";
import StudentCard from "../components/StudentCard";
import MyStudentCard from "../components/MyStudentCard";
import EnrollSchedule from "../components/EnrollSchedule";
export default class StudentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      a: false
    };
  }

  render() {
    if (this.state.a) {
      return (
        <div className="justify-content-center">
          <div className="row justify-content-center">
            <StudentCard />
          </div>
        </div>
      );
    } else {
      return (
        <div className="justify-content-center">
          <div className="row justify-content-center">
            <MyStudentCard />
            <EnrollSchedule />
          </div>
        </div>
      );
    }
  }
}
