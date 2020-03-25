import React, { Component } from "react";
import StudentCard from "../components/StudentCard";
import MyStudentCard from "../components/MyStudentCard";
import EnrollSchedule from "../components/EnrollSchedule";
export default class StudentPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.owner) {
      console.log(this.props.owner);
      return (
        <div className="justify-content-center">
          <div className="row">
            <div className="col-md-12" align="center">
              <MyStudentCard data={this.props.data} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="justify-content-center">
          <div className="row">
            <div className="col-md-12" align="center">
              <StudentCard data={this.props.data} />
            </div>
          </div>
        </div>
      );
    }
  }
}
