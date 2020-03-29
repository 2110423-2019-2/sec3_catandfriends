import React, { Component } from "react";
import CourseDetail from "../components/CourseDetail";
// import TutorCard from "../components/TutorCard";
import Comment from "../components/Comment";
import Util from "../apis/Util";
export default class CourseInformation extends Component {
  state = { data: null };

  render() {
    if (!this.state.data) {
      return <div align="center"></div>;
    } else {
      return (
        <div className="justify-content-center">
          <div className="row justify-content-center">
            <h2
              style={{
                padding: "5px 15px",
                margin: "30px",
                textAlign: "center",
                color: "black",
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "12px"
              }}
            >
              {"Course: " + this.state.data.courseName}
            </h2>
            <div className="col-md-12" align="center">
              <CourseDetail detail={this.state.data} />
            </div>
          </div>
        </div>
      );
    }
  }

  async componentDidMount() {
    console.log(window.location.search);
    let data = await Util.getCourseById(window.location.search.substring(10));
    this.setState({ data });
    console.log(data);
  }
}
