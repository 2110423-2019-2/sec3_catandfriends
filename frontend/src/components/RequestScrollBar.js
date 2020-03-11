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
        <div className="card" data-spy="scroll" id="overflowTest">
          {this.state.data.map(item => {
            if (item.status === 0) {
              return (
                <table class="table table-borderless" key={item.requestId}>
                  <td>
                    <label>{item.studentName}</label>
                  </td>
                  <td>
                    <label>{item.courseName}</label>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
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
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
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
                  </td>
                </table>
              );
            }
          })}
        </div>
      );
    } else {
      return <div>...Loading</div>;
    }
  }

  async componentDidMount() {
    let data = await Util.getRequests(this.props.tutorId);
    this.setState({ data });
    console.log(data);
  }
}
