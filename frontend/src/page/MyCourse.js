import React, { Component } from "react";
import EnrollSchedule from "../components/EnrollSchedule";
import Util from "../apis/Util";
import RequestScrollBar from "../components/RequestScrollBar";
import EditCourseCardLayout from "../components/EditCourseCardLayout";
export default class MyCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.state.data) {
      return <div className=" wholeB justify-content-center"></div>;
    } else if (this.state.data.role == "student") {
      return (
        <div className=" wholeB justify-content-center">
          <EnrollSchedule userId={this.state.data._id} />
        </div>
      );
    } else if (this.state.data.role == "tutor") {
      return (
        <div className=" wholeB justify-content-center">
          <div className="row justify-content-center">
            <RequestScrollBar tutorId={this.state.data._id} />
          </div>
          <div className="row justify-content-center">
            <EditCourseCardLayout tutorId={this.state.data._id} />
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
