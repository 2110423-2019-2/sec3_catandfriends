import React, { Component } from "react";
import Axios from "axios";

export default class EnrollSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          studentId: "12",
          courseId: "13",
          courseName: "course1",
          tutorName: "tutor1",
          enrollDate: "enrollDate1",
          startDate: "startDate1",
          endDate: "endDate1"
        },
        {
          studentId: "12",
          courseId: "23",
          courseName: "course2",
          tutorName: "tutor2",
          enrollDate: "enrollDate2",
          startDate: "startDate2",
          endDate: "endDate2"
        },
        {
          studentId: "12",
          courseId: "24",
          courseName: "course3",
          tutorName: "tutor3",
          enrollDate: "enrollDate3",
          startDate: "startDate3",
          endDate: "endDate3"
        }
      ]
    };
  }

  render() {
    // var dataArray = [];
    // var url = "/myprofile/"+keyword;
    // Axios.get(url).then(result=>{
    // console.log(JSON.stringify(result.data.results))
    // result.data.results.forEach(item=>{
    // item.poster_src = "https://image.tmdb.org/t/p/w185"+ item.poster_path
    // dataArray.push(item)
    //this.setState({rows: dataArray})

    return (
      <div className="card" style={{ maxWidth: 1000 }}>
        <div className="card-body">
          <h4 className="card-title" style={{ textAlign: "center" }}>
            Enrollment and Schedule
          </h4>
          <br />
          <div className="row">
            <div class="col-md-2 border">
              <body style={{ textAlign: "center" }}>Course ID</body>
            </div>
            <div class="col-md-2 border">
              <body style={{ textAlign: "center" }}>Course Name</body>
            </div>
            <div class="col-md-2 border">
              <body style={{ textAlign: "center" }}>Tutor Name</body>
            </div>
            <div class="col-md-2 border">
              <body style={{ textAlign: "center" }}>Enroll Date</body>
            </div>
            <div class="col-md-2 border">
              <body style={{ textAlign: "center" }}>Start Date</body>
            </div>
            <div class="col-md-2 border">
              <body style={{ textAlign: "center" }}>End Date</body>
            </div>
          </div>
          {this.state.rows.map(item => (
            <RowInformation detail={item} />
          ))}
        </div>
      </div>
    );
  }
}
class RowInformation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      studentId,
      courseId,
      courseName,
      tutorName,
      enrollDate,
      startDate,
      endDate
    } = this.props.detail;
    return (
      <div
        className="row"
        key={this.props.detail.courseId}
        style={{ textAlign: "left" }}
      >
        <div class="col-md-2 border">
          <body style={{ textAlign: "center" }}>{courseId}</body>
        </div>
        <div class="col-md-2 border">
          <body style={{ textAlign: "center" }}>{courseName}</body>
        </div>
        <div class="col-md-2 border">
          <body style={{ textAlign: "center" }}>{tutorName}</body>
        </div>
        <div class="col-md-2 border">
          <body style={{ textAlign: "center" }}>{enrollDate}</body>
        </div>
        <div class="col-md-2 border">
          <body style={{ textAlign: "center" }}>{startDate}</body>
        </div>
        <div class="col-md-2 border">
          <body style={{ textAlign: "center" }}>{endDate}</body>
        </div>
      </div>
    );
  }
}
