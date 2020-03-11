import React, { Component } from "react";
import CourseDetail from "../components/CourseDetail";
// import TutorCard from "../components/TutorCard";
import Comment from "../components/Comment";
import Util from "../apis/Util";
export default class CourseInformation extends Component {
  state = { data: {} };

  render() {
    if (this.state.data) {
      return (
        <div className="justify-content-center">
          <div className="row justify-content-center">
            {/* <TutorCard /> */}
            <CourseDetail detail={this.state.data} />
          </div>
          <div className="row justify-content-center"></div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  async componentDidMount() {
    console.log(window.location.search);
    let data = await Util.getCourseById(window.location.search.substring(10));
    this.setState({ data });
    console.log(data);
  }
}
