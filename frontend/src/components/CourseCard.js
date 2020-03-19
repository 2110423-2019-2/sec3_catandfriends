import React from "react";
import "./CourseCard.css";
import history from "./../history";
import styled from "styled-components";
const Button = styled.button`
  color: black;
  transition: 0.3s;
  background-color: ${props =>
    props.full ? "rgb(214,111,110)" : "rgb(19, 204, 169)"};
  font-size: 1.1em;
  outline: none;
  font-weight: 500;
  padding: 0.25em 0.5em;
  border-radius: 10px;
  &:hover {
    text-decoration: none;
    color: white;
    background: ${props =>
      props.full
        ? `linear-gradient(90deg, rgba(134,31,31,1) 0%, rgba(214,111,110,1) 100%);`
        : `linear-gradient(
      90deg,
      rgba(25, 108, 70, 1) 0%,
      rgba(19, 204, 169, 1) 100%
    )`};
  }
  &:focus {
    outline: none;
  }
`;
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
          <h5 className="card-title mycard-title">{courseName}</h5>
          <p className="card-text tutorname">{fullname}</p>
          {/* <p className="card-text date">{duration}</p> */}
          <div align="center" style={{ marginBottom: "5px" }}>
            <textarea className="card-text day" disabled>
              {this.dayToString(day)}
            </textarea>
          </div>
          <Button full={!this.props.detail.isAvailable}>
            {this.props.detail.amountOfStudent +
              "/" +
              this.props.detail.totalAmountOfStudent +
              " | " +
              priceS}
          </Button>
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
