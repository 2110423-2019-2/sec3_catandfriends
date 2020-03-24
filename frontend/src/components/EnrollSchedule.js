import React, { Component } from "react";
import Util from "../apis/Util";

export default class EnrollSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
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
    if (this.state.courses) {
      return (
        <div className="row justify-content-center">
          <div className="card" style={{ width: "1200px" }}>
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
                  <body style={{ textAlign: "center" }}>
                    Start Date - End Date
                  </body>
                </div>
                <div class="col-md-2 border">
                  <body style={{ textAlign: "center" }}>Class Day</body>
                </div>
              </div>
              {this.state.courses.map(item => (
                <RowInformation detail={item} />
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  async componentDidMount() {
    let courses = [];
    let schedule = await Util.getSchedule(this.props.userId);
    console.log(schedule);
    schedule.listOfCourse.forEach(courseId => {
      let course = Util.getCourseById(courseId);
      courses.push(course);
    });
    courses = await Promise.all(courses);
    console.log(courses);
    this.setState({ courses });
  }
}
class RowInformation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      _id,
      courseName,
      tutorName,
      createdTime,
      startDate,
      endDate,
      day
    } = this.props.detail;
    if (this.props.detail) {
      return (
        <div
          className="row"
          key={this.props.detail._id}
          style={{ textAlign: "left" }}
        >
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>{_id}</body>
          </div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>{courseName}</body>
          </div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>{tutorName}</body>
          </div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>
              {createdTime.substring(0, 10)}
            </body>
          </div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>
              {startDate.substring(0, 11) + " - " + endDate.substring(0, 11)}
            </body>
          </div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>{day}</body>
          </div>
        </div>
      );
    }
  }
}
