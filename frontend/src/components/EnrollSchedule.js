import React, { Component } from "react";
import Util from "../apis/Util";
import "./EnrollSchedule.css";
import history from "../history";
export default class EnrollSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: null,
      ready: false
    };
  }

  render() {
    if (this.state.ready) {
      if (!this.state.schedule.length) {
        return (
          <div className="row justify-content-center">
            <div className="card" style={{ width: "1000px" }}>
              <div className="card-body">
                <h4 className="card-title" style={{ textAlign: "center" }}>
                  Enrollment and Schedule
                </h4>
                <br />
                <div className="row justify-content-center">
                  <h5>You have no enrollment</h5>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="row justify-content-center">
            <div
              className="card"
              style={{ width: "1000px", minWidth: "1000px" }}
            >
              <div className="card-body">
                <h4 className="card-title" style={{ textAlign: "center" }}>
                  Enrollment and Schedule
                </h4>
                <br />
                <div className="row justify-content-center">
                  {/* <div class="col-md-2 border">
                    <body style={{ textAlign: "center" }}>Course ID</body>
                  </div> */}
                  <div class="col-md-1 justify-content-center"></div>
                  <div class="col-md-2 border justify-content-center">
                    <body style={{ textAlign: "center", fontWeight: "bold" }}>
                      Course Name
                    </body>
                  </div>
                  <div class="col-md-2 border justify-content-center">
                    <body style={{ textAlign: "center", fontWeight: "bold" }}>
                      Tutor Name
                    </body>
                  </div>
                  <div class="col-md-2 border justify-content-center">
                    <body style={{ textAlign: "center", fontWeight: "bold" }}>
                      Enroll Date
                    </body>
                  </div>
                  <div class="col-md-2 border justify-content-center">
                    <body style={{ textAlign: "center", fontWeight: "bold" }}>
                      Start Date - End Date
                    </body>
                  </div>
                  <div class="col-md-2 border">
                    <body style={{ textAlign: "center", fontWeight: "bold" }}>
                      Class Day
                    </body>
                  </div>
                  <div class="col-md-1 justify-content-center"></div>
                </div>
                {this.state.schedule.map(item => (
                  <RowInformation detail={item} />
                ))}
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="row justify-content-center">
          <div className="card" style={{ width: "1000px" }}>
            <div className="card-body">
              <h4 className="card-title" style={{ textAlign: "center" }}>
                Enrollment and Schedule
              </h4>
              <br />
              <div className="row justify-content-center">
                <h5>Loading...</h5>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  async componentDidMount() {
    let schedule = await Util.getSchedule(this.props.userId);
    console.log(schedule);
    this.setState({
      schedule: schedule,
      ready: true
    });
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
      enrollDate,
      duration,
      day
    } = this.props.detail;
    if (this.props.detail) {
      return (
        <div
          className="row"
          key={this.props.detail._id}
          style={{ textAlign: "left" }}
        >
          {/* <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>{_id}</body>
          </div> */}
          <div class="col-md-1 justify-content-center"></div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>
              {courseName ? courseName : "-"}
            </body>
          </div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>
              {tutorName ? tutorName : "-"}
            </body>
          </div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>
              {enrollDate ? enrollDate : "-"}
            </body>
          </div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>
              {duration ? duration : "-"}
            </body>
          </div>
          <div class="col-md-2 border">
            <body style={{ textAlign: "center" }}>{day ? duration : "-"}</body>
          </div>
          <div class="col-md-1 justify-content-center"></div>
        </div>
      );
    }
  }
}
