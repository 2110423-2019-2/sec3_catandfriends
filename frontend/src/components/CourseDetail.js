import React, { Component } from "react";
import "./CourseDetail.css";
import TutorCard from "../components/TutorCard";
import history from "../history";
import Util from "../apis/Util";

export class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://www.img.in.th/images/ced52db8eb1c2a59ab18b803b25e80c9.jpg",
      TutorName: "jonh",
      courseId: "123456789",
      courseName: "A",
      dayAndtime: "friday 10:00-12:00",
      startDate: "1970-01-20 T17:00:00.000+00:00",
      endDate: "1970-01-29 T17:00:00.000+00:00",
      tutorId: "123456789",
      amountOfStudent: "5",
      description: "just enroll this course and you will get nothing",
      requestable: true
    };
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const date = (this.props.detail.lastModified + "").substring(0, 21);
    console.log(date);
    //console.log(this.props.detail);
    let showbutton;
    if (this.state.requestable) {
      showbutton = (
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={event => this.onClick(event)}
        >
          Request
        </button>
      );
    } else {
      showbutton = (
        <button variant="dark" type="button" disabled={true}>
          Requested
        </button>
      );
    }
    return (
      <div className="card mb-3" style={{ maxWidth: "1000px" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <div align="center">
              <img
                src={this.state.imgsrc}
                className="card-img p-3"
                style={{ maxWidth: "300px" }}
                alt="..."
              />
            </div>
            <div align="center">
              <TutorCard
                tutorname={this.props.detail.tutorName}
                tutorid={this.props.detail.tutorId}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="row border text-center" className="myStyle">
                <h3 className="card-title border">Course Detail</h3>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6 border">
                  <h4>{this.props.detail.courseName}</h4>
                </div>
                <div className="col-md-6 border">
                  <h5 className="tutorname">
                    {" by " + this.props.detail.tutorName}
                  </h5>
                </div>

                <div className="col-md-4 border">
                  <br />
                  {/*Enter*/}
                  <br />
                  <body>
                    <strong>Category : </strong>
                  </body>
                  <body>
                    <strong>Start Date : </strong>
                  </body>
                  <body>
                    <strong>End Date : </strong>
                  </body>
                  <body>
                    <strong>Amount Left : </strong>
                  </body>
                  <body>
                    <strong>Price : </strong>
                  </body>

                  <br />
                  {/*Enter*/}
                  <br />
                </div>
                <div className="col-md-8 border">
                  <br />
                  {/*Enter*/}
                  <br />
                  <body>{this.props.detail.category}</body>
                  <body>{this.props.detail.startDate}</body>
                  <body>{this.props.detail.endDate}</body>
                  <body>
                    {this.props.detail.amountOfStudent +
                      "/" +
                      this.props.detail.totalAmountOfStudent}
                  </body>
                  <body>{this.props.detail.courseFee}</body>
                  <br />
                  {/*Enter*/}

                  <br />
                </div>

                <div className="col-md-12 border">
                  <br />
                  <strong>Class Time :</strong>
                  <p className="card-text">{this.props.detail.day}</p>
                  <br />
                </div>
                <div className="col-md-12 border">
                  <br />
                  <strong>Description :</strong>
                  <p className="card-text">{this.state.description}</p>
                  <br />
                </div>

                <div className="col-md-12 border">
                  <div className="alert alert-warning">
                    <strong>Warning!</strong> If you request to enroll this
                    course, you can not cancel.
                  </div>
                  <div className="myStyle">{showbutton}</div>
                  <br />
                </div>
                <p className="card-text">
                  <small className="text-muted">
                    {"Last updated " +
                      (this.props.detail.lastModified + "").substring(0, 10) +
                      " " +
                      (this.props.detail.lastModified + "").substring(11, 19)}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async onClick(event) {
    //console.log(this.state);
    // event.preventDefault();

    let data = await Util.createRequests(
      this.props.detail.tutorId,
      this.props.detail._id
    );
    // console.log(data);
    // if (data.error) {
    //   window.alert("cannot request");
    // } else {
    //   //history.push(`/login`);
    // }
  }
}
export default CourseDetail;
