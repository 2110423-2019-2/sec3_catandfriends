import React, { Component } from "react";
import "./RequestScrollBar.css";
import Util from "../apis/Util";

export default class RequestScrollBar extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  handleButton = async (requestId, status, studentId, courseId) => {
    let data = await Util.updateRequest(requestId, status, studentId, courseId);
    data = await Util.getRequests(this.props.tutorId);
    this.setState({ data });
    console.log(data);
    //add student to class
  };

  render() {
    if (this.state.data) {
      return (
        <div className="requestCard background-color-trans">
          {this.state.data.map(item => {
            if (item.status === 0) {
              return (
                <div
                  className="row justify-content-center tableR inside-block"
                  key={item.requestId}
                >
                  <div className="col-md-4 justify-content-center">
                    <a href={`/profile?userId=${item.studentId}`}>
                      {item.studentName}
                    </a>
                  </div>
                  <div className="col-md-4 justify-content-center textnormal">
                    <div>{item.courseName}</div>
                  </div>
                  <div className="col-md-2 justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success btn-block"
                      onClick={() =>
                        this.handleButton(
                          item.requestId,
                          1,
                          item.studentId,
                          item.courseId
                        )
                      }
                    >
                      Accept
                    </button>
                  </div>
                  <div className="col-md-2 justify-content-center">
                    <button
                      type="button"
                      className="btn btn-danger btn-block"
                      onClick={() =>
                        this.handleButton(
                          item.requestId,
                          -1,
                          item.studentId,
                          item.courseId
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return (
        <div className="requestCard background-color-trans">
          {/* <h5 align="center">Request List</h5> */}
        </div>
      );
    }
  }

  async componentDidMount() {
    let data = await Util.getRequests(this.props.tutorId);
    this.setState({ data });
    console.log(data);
  }
}
