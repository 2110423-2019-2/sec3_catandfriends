import React, { Component } from "react";
import Util from "../apis/Util";
import "./EnrollSchedule.css";
import history from "../history";
export default class EnrollSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  render() {
    if (this.state.courses) {
      return (
        <div className="justify-content-center">
          <div className="row">
            <div className="col-md-12" align="center">
              <div className="enrollCard">
                <h3 className="enrollH text-center">Enrollment and Schedule</h3>
                <div className="row" style={{}}>
                  <div className="col-md-12" style={{ padding: "30px" }}>
                    <div className="row">
                      <div className="col-md-2 " style={{ padding: "0px" }}>
                        <div className="nameR " style={{ textAlign: "center" }}>
                          Course Name
                        </div>
                      </div>
                      <div className="col-md-2 " style={{ padding: "0px" }}>
                        <div className="nameR" style={{ textAlign: "center" }}>
                          Tutor Name
                        </div>
                      </div>
                      <div className="col-md-2 " style={{ padding: "0px" }}>
                        <div className="nameR" style={{ textAlign: "center" }}>
                          Enroll Date
                        </div>
                      </div>
                      <div className="col-md-2 " style={{ padding: "0px" }}>
                        <div className="nameR" style={{ textAlign: "center" }}>
                          Start Date
                        </div>
                      </div>
                      <div className="col-md-2 " style={{ padding: "0px" }}>
                        <div className="nameR" style={{ textAlign: "center" }}>
                          End Date
                        </div>
                      </div>
                      <div className="col-md-2 " style={{ padding: "0px" }}>
                        <div className="nameR" style={{ textAlign: "center" }}>
                          Class Day
                        </div>
                      </div>
                    </div>
                    {this.state.courses.map(item => (
                      <RowInformation detail={item} />
                    ))}
                  </div>
                </div>
              </div>
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
  dayToString(day) {
    if (!day) {
      return "";
    }
    let dayL = day.split("/");
    let dayS = dayL.join("\n");
    return dayS;
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
        <div className="row" key={this.props.detail._id}>
          <div className="col-md-2 border">
            <a
              className="courseL"
              style={{ textAlign: "center" }}
              onClick={() => {
                history.push(`/course?courseId=${_id}`);
              }}
            >
              {courseName}
            </a>
          </div>
          <div className="col-md-2 border">
            <div style={{ textAlign: "center" }}>{tutorName}</div>
          </div>
          <div className="col-md-2 border">
            <div style={{ textAlign: "center" }}>
              {createdTime.substring(0, 10)}
            </div>
          </div>
          <div className="col-md-2 border">
            <div style={{ textAlign: "center" }}>
              {startDate.substring(0, 11)}
            </div>
          </div>
          <div className="col-md-2 border">
            <div style={{ textAlign: "center" }}>
              {endDate.substring(0, 11)}
            </div>
          </div>
          <div className="col-md-2 border justify-content-center">
            <textarea className="Eday" style={{ textAlign: "center" }}>
              {this.dayToString(day)}
            </textarea>
          </div>
        </div>
      );
    }
  }
}
