import React from "react";
import "./CourseCard.css";
import "./EditableCard.css";
import history from "./../history";
import CourseButton from "./CourseButton";
class CourseCard extends React.Component {
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
      <div
        className="card mycard clickable"
        onClick={() => this.onClickGotoCourseInform(courseid)}
      >
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
          {" "}
          <div style={{ height: "120px", paddingLeft: "5px" }}>
            <div className="mcard-header--title">{category}</div>
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
        <div className="card-body mycard-body">
          <div className="mycard-title textheader">{courseName}</div>
          <p className="card-text tutorname">{fullname}</p>
          {/* <p className="card-text date">{duration}</p> */}
          <div align="center" style={{ marginBottom: "5px" }}>
            <textarea className="card-text day day-coursecard" disabled>
              {this.dayToString(day)}
            </textarea>
          </div>
          <CourseButton className="width90" full={!this.props.detail.isAvailable}>
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
//ll
export default CourseCard;
