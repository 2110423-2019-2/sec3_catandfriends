import React, { Component } from "react";
import history from "./../history";
import "./CourseCard.css";
import "./EditableCard.css";
import CourseButton from "./CourseButton";

export default class EditableCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoDark: "https://i.ibb.co/jM8cWXv/logoDark.png"
    };
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
      courseID,
      courseName,
      tutorid,
      description,
      price,
      category,
      day,
      duration
    } = this.props.detail;
    // console.log(this.props.detail);
    const fullname = this.props.detail.tutorName
      ? "by " + this.props.detail.tutorName
      : "";
    const image =
      "https://i.kym-cdn.com/photos/images/newsfeed/001/535/446/1c5.jpg";
    const priceS = this.props.detail.courseFee + "฿";
    const courseid = this.props.detail._id;
    return (
      <div className="card mycard">
        <div
          style={{
            backgroundImage: `url(${
              this.props.detail.courseImg
                ? this.props.detail.courseImg
                : this.state.logoDark
            })`
          }}
          id="image"
          className="mcard-header"
        >
          <div style={{ height: "120px", paddingLeft: "5px" }}>
            <div className="mcard-header--title">{category}</div>{" "}
            <button
              class="button button-secondary"
              onClick={() => {
                history.push(`/course/edit?courseId=${courseid}`);
              }}
            >
              <h6>
                <i className="fa fa-edit">Edit</i>
              </h6>
            </button>
          </div>
          <div style={{ height: "30px" }}>
            <div
              className="mcard-header--title"
              style={{ fontSize: "small", width: "100%" }}
            >
              {duration}
            </div>
          </div>
        </div>
        <div className="card-body mycard-body background-color">
          <div className="textheader">{courseName}</div>
          <p className="card-text tutorname">{fullname}</p>
          <div align="center" style={{ marginBottom: "5px" }}>
            <textarea className="card-text day day-coursecard">
              {this.dayToString(day)}
            </textarea>
          </div>
          <CourseButton className="button-white width90"
            onClick={() => this.onClickGotoCourseInform(courseid)}
            full={!this.props.detail.isAvailable}
          >
            {this.props.detail.amountOfStudent +
              "/" +
              this.props.detail.totalAmountOfStudent +
              " | " +
              priceS}
          </CourseButton>
        </div>
      </div>
    );
  }
  onClickGotoCourseInform = courseId => {
    history.push(`/course?courseId=${courseId}`);
  };
}
