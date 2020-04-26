import React, { Component } from "react";
import "./CourseDetail.css";
import TutorCard from "../components/TutorCard";
import history from "../history";
import Util from "../apis/Util";
import NormalButton from "./NormalButton";
import Rating from "@material-ui/lab/Rating";
export class CourseDetail extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      imgsrc:
        "https://www.img.in.th/images/ced52db8eb1c2a59ab18b803b25e80c9.jpg",
    };
    this.onClick = this.onClick.bind(this);
  }
  round_to_precision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }
  render() {
    const date = (this.props.detail.lastModified + "").substring(0, 21);
    console.log(date);
    console.log(this.state.requestable);
    //console.log(this.props.detail);
    let showbutton;
    let requestmsg = this.props.detail.requestStatus;
    // alert(this.props.detail.requestStatus);
    if (requestmsg == "requestable") {
      showbutton = (
        <button
          className="button-white"
          onClick={(event) => this.onClick(event)}
        >
          Request
        </button>
      );
    } else if (this.props.detail.owner) {
      showbutton = (
        <button
          className="button-white"
          onClick={() => {
            history.push(`/course/edit?courseId=${this.props.detail.courseid}`);
          }}
        >
          Edit Course
        </button>
      );
    } else if (requestmsg == "unrequestable") {
      showbutton = <div></div>;
    } else {
      showbutton = (
        <button
          className="button-white"
          onClick={(event) => this.onClick(event)}
          disabled
        >
          {requestmsg}
        </button>
      );
    }

    let studentList;
    if (this.props.detail.owner) {
      studentList = (
        <div className="col-md-12">
          <AllStudentList data={this.props.detail} />
        </div>
      );
    } else {
      studentList = <div></div>;
    }
    return (
      <div className="bigCard" style={{ marginBottom: "20px" }}>
        <div className="row ">
          <div className={this.props.detail.owner ? "col-md-9" : "col-md-12"}>
            <div className="row  text-center" className="myStyle">
              <div className="inside-block textshadow">Course Detail</div>
            </div>
            <div className="row " style={{ padding: "5px 20px" }}>
              <div className="col-md-6 ">
                <div className="textshadow">{this.props.detail.courseName}</div>
              </div>
              <div className="col-md-6 ">
                <a
                  className="textshadow"
                  href={`/profile?userId=${this.props.detail.tutorId}`}
                >
                  {" by " + this.props.detail.tutorName}
                </a>
              </div>
            </div>
            <div className="row" style={{ padding: "5px 20px" }}>
              <div className="col-md-12  infoC" style={{ marginBottom: "5px" }}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Rating:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.detail.numberOfRating == 0
                        ? 0
                        : Math.round(
                            (this.props.detail.sumOfRating /
                              this.props.detail.numberOfRating +
                              Number.EPSILON) *
                              100
                          ) /
                            100 +
                          " "}
                      <Rating
                        name="read-only"
                        precision={0.1}
                        value={
                          this.props.detail.numberOfRating == 0
                            ? 0
                            : Math.round(
                                (this.props.detail.sumOfRating /
                                  this.props.detail.numberOfRating +
                                  Number.EPSILON) *
                                  100
                              ) / 100
                        }
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Category:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.detail.category.charAt(0).toUpperCase() +
                        this.props.detail.category.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-4">
                    <div className="nameB">Start Date:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">{this.props.detail.startDate}</div>
                  </div>
                </div>{" "}
                <div className="row ">
                  <div className="col-md-4">
                    <div className="nameB">End Date:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">{this.props.detail.endDate}</div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-4">
                    <div className="nameB">Amount Left:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.detail.amountOfStudent +
                        "/" +
                        this.props.detail.totalAmountOfStudent}
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-4">
                    <div className="nameB">Price:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">{this.props.detail.courseFee}</div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-4">
                    <div className="nameB">Class day:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">{this.props.detail.day}</div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-4">
                    <div className="nameB">Description:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.detail.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 ">
                {this.state.requestable ? (
                  <div className="alert alert-warning">
                    <strong>Warning!</strong> If you request to enroll this
                    course, you can not cancel.
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="row justify-content-center">
                  <div className="myStyle">{showbutton}</div>
                </div>
              </div>
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
          {this.props.detail.owner ? (
            <div className="col-md-3">{studentList}</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    let data = await Util.getProfile();
    this.setState({
      requestable: this.props.detail.requestable,
      data,
    });
  }

  async onClick(event) {
    //console.log(this.state);
    // event.preventDefault();
    // this.state.requestable = false

    let data = await Util.createRequests(
      this.props.detail.tutorId,
      this.props.detail._id
    );
    window.location.reload();
    if (data.status == 0) {
      window.alert("Course Time Overlap");
    } else {
      this.setState({ requestable: false });
    }
    // console.log(data);
    // if (data.error) {
    //   window.alert("cannot request");
    // } else {
    //   //history.push(`/login`);
    // }
  }
}
class AllStudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    if (!this.state.data) {
      return <a></a>;
    }
    return (
      <div className="text-center">
        <div className="textshadow">Student List</div>
        <div className="row justify-content-center">
          <div className="col-md-12 slist justify-content-center">
            {this.state.data.map((item) => (
              <StudentList detail={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    var studentList = [];
    console.log(this.props.data);
    this.props.data.listOfStudentId.forEach((studentId) => {
      let student = Util.getProfile(studentId);
      studentList.push(student);
    });
    studentList = await Promise.all(studentList);
    console.log(studentList);
    this.setState({ data: studentList });
  }
}
class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-12 slist justify-content-center">
          <button
            className="button-studentList"
            onClick={() => this.onClick(this.props.detail._id)}
          >
            {this.props.detail.firstName + "\t" + this.props.detail.lastName}
          </button>
        </div>
      </div>
    );
  }

  onClick = (studentId) => {
    history.push(`/profile?userId=${studentId}`);
  };
}

export default CourseDetail;
