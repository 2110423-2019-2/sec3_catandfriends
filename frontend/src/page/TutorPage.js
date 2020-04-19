import React, { Component } from "react";
import TutorProfile from "../components/TutorProfile";
import VerifyCard from "../components/VerifyCard";
import RequestScrollBar from "../components/RequestScrollBar";
import EditCourseCardLayout from "../components/EditCourseCardLayout";
import CourseCardLayout from "../components/CourseCardLayout";
import StudentCTuProfile from "../components/StudentCTuProfile";
import Util from "../apis/Util";
import "./TutorPage.css";
export default class TutorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {}
    };
  }

  render() {
    if (this.props.owner) {
      return (
        <div className="justify-content-center">
          <div className="row">
            <div className="col-md-12" align="center">
              <TutorProfile data={this.props.data} />
            </div>
          </div>
        </div>
      );
    } else {
      console.log(this.props.data);
      return (
        <div className="justify-content-center">
          <div className="row">
            <div className="col-md-12" align="center">
              <StudentCTuProfile data={this.props.data} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12" align="center">
              <div className="row justify-content-center">
                <h2
                className="insidetrans-block textheader"
                  style={{
                    padding: "5px 15px",
                    textAlign: "center",
                    borderRadius: "12px"
                  }}
                >
                  Tutor's Courses
                </h2>
              </div>
              <div className="row justify-content-center">
                <CourseCardLayout data={this.state.detail} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  async componentDidMount() {
    console.log(this.props.data._id);
    let detail = await Util.getCourseByTutorId(this.props.data._id);
    console.log(detail);
    this.setState({ detail });
  }
}
