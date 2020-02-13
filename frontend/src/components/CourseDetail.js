import React, { Component } from "react";
import "./CourseDetail.css";
export class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://www.img.in.th/images/ced52db8eb1c2a59ab18b803b25e80c9.jpg",
      courseId: "123456789",
      courseName: "A",
      dayAndtime: "friday 10:00-12:00",
      startDate: "1970-01-20 T17:00:00.000+00:00",
      endDate: "1970-01-29 T17:00:00.000+00:00",
      tutorId: "123456789",
      amountOfStudent: "5",
      description: "just enroll this course and you will get nothing"
    };
  }

  render() {
    return (
      <div className="card mb-3" style={{ maxWidth: "1000px" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={this.state.imgsrc}
              className="card-img p-3"
              style={{ maxWidth: "300px" }}
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="row border text-center" className="myStyle">
                <h3 className="card-title border">Course Details</h3>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6 border">
                  <h4
                    style={
                      {
                        /* textAlign: "center"*/
                      }
                    }
                  >
                    {this.state.courseName}
                  </h4>
                </div>
                <div className="col-md-6 border">
                  <h4>{this.state.courseId}</h4>
                </div>

                <div className="col-md-12 border">
                  <br />
                  {/*Enter*/}
                  <br />
                  <body>
                    <strong>Day and Time : </strong> {this.state.dayAndtime}
                  </body>
                  <body>
                    <strong>Start day : </strong> {this.state.startDate}
                  </body>
                  <body>
                    <strong>End day : </strong> {this.state.endDate}
                  </body>
                  <body>
                    <strong>tutor Id : </strong> {this.state.tutorId}
                  </body>
                  <h6>should we show the tutor name?</h6>
                  <br />
                  {/*Enter*/}
                  <br />
                </div>

                <div className="col-md-12 border">
                  <br />
                  <br />
                  <p className="card-text">
                    {this.state.description}
                    {/*This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.*/}
                  </p>
                </div>

                <div className="col-md-12 border">
                  <div className="alert alert-warning">
                    <strong>Warning!</strong> If you request to enroll this
                    course.....
                  </div>
                  <div className="myStyle">
                    <button type="button" className="btn btn-outline-success">
                      Request
                    </button>
                  </div>
                  <br />
                </div>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;
