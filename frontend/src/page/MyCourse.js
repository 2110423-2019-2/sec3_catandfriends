import React, { Component } from "react";
import EnrollSchedule from "../components/EnrollSchedule";
import Util from "../apis/Util";
import RequestScrollBar from "../components/RequestScrollBar";
import EditCourseCardLayout from "../components/EditCourseCardLayout";
// import "./MyCourse.css";
export default class MyCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.state.data) {
      return <div className=" justify-content-center"></div>;
    } else if (this.state.data.role == "student") {
      return (
        <div className=" justify-content-center">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <EnrollSchedule userId={this.state.data._id} />
            </div>
          </div>
        </div>
      );
    } else if (this.state.data.role == "tutor") {
      return (
        <div className="justify-content-center">
          <div className="row">
            <div className="col-md-12" align="center">
              <RequestScrollBar tutorId={this.state.data._id} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12" align="center">
              <EditCourseCardLayout tutorId={this.state.data._id} />
            </div>
          </div>
        </div>
      );
    }
  }
  async componentDidMount() {
    console.log(window.location.search);
    let params = new URLSearchParams(window.location.search);
    let data = await Util.getProfile(params.get("userId"));
    await this.setState({ data });
    await console.log(data);
    console.log(localStorage.getItem("token"));
  }
}
