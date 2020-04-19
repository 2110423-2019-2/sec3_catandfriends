import React, { Component } from "react";
import Util from "../apis/Util";
import "./EnrollSchedule.css";
import history from "../history";
export default class EnrollSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // if (this.state.ready) {
    //   if (!this.state.schedule.length) {
    if (!this.state.schedule) {
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
                    <div className="row">
                      <div className="col-md-12">
                        <div className="textshadow"
                          style={{
                            paddingTop: "20px"
                          }}
                        >
                          Loading...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      if (this.state.schedule.length) {
        return (
          <div className="justify-content-center">
            <div className="row">
              <div className="col-md-12" align="center">
                <div className="enrollCard">
                  <h3 className="enrollH text-center">
                    Enrollment and Schedule
                  </h3>
                  <div className="row" style={{}}>
                    <div className="col-md-12" style={{ padding: "30px" }}>
                      <div className="row">
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR "
                            style={{ textAlign: "center" }}
                          >
                            Course Name
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            Tutor Name
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            Enroll Date
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            Start Date
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            End Date
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            Class Day
                          </div>
                        </div>
                      </div>
                      {this.state.schedule.map(item => (
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
        return (
          <div className="justify-content-center">
            <div className="row">
              <div className="col-md-12" align="center">
                <div className="enrollCard">
                  <h3 className="enrollH text-center">
                    Enrollment and Schedule
                  </h3>
                  <div className="row" style={{}}>
                    <div className="col-md-12" style={{ padding: "30px" }}>
                      <div className="row">
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR "
                            style={{ textAlign: "center" }}
                          >
                            Course Name
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            Tutor Name
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            Enroll Date
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            Start Date
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            End Date
                          </div>
                        </div>
                        <div className="col-md-2 " style={{ padding: "0px" }}>
                          <div
                            className="nameR"
                            style={{ textAlign: "center" }}
                          >
                            Class Day
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 ">
                          <div className="textshadow"
                            style={{
                              paddingTop: "20px"
                            }}
                          >
                            You have no course enrollment
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  async componentDidMount() {
    let schedule = await Util.getSchedule(this.props.userId);
    console.log(schedule);
    this.setState({ schedule });
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
        <div className="row" key={this.props.detail._id}>
          <div className="col-md-2 background-color">
            <a
              className="courseL"
              style={{ textAlign: "center" }}
              onClick={() => {
                history.push(`/course?courseId=${_id}`);
              }}
            >
              {courseName ? courseName : "-"}
            </a>
          </div>
          <div className="col-md-2 background-color textnormal">
            <div style={{ textAlign: "center" }}>
              {tutorName ? tutorName : "-"}
            </div>
          </div>

          <div class="col-md-2 background-color textnormal">
            <div style={{ textAlign: "center" }}>
              {enrollDate ? enrollDate : "-"}
            </div>
          </div>

          <div class="col-md-2 background-color textnormal">
            <div style={{ textAlign: "center" }}>
              {duration ? duration.split(" - ")[0] : "-"}
            </div>
          </div>
          <div class="col-md-2 background-color textnormal">
            <div style={{ textAlign: "center" }}>
              {duration ? duration.split(" - ")[1] : "-"}
            </div>
          </div>
          <div className="col-md-2 justify-content-center background-color textnormal">
            <textarea class="Eday" style={{ textAlign: "center" }}>
              {day ? this.dayToString(day) : "-"}
            </textarea>
          </div>
        </div>
      );
    }
  }
}
