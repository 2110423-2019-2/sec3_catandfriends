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
  }
  dayToString(day) {
    let dayL = day.split("/");
    let dayS = "";
    let e;
    for (e of dayL) {
      dayS = dayS + e;
    }
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
            backgroundImage: `url(${image})`
          }}
          id="image"
          className="mcard-header"
        >
          <h6 className="mcard-header--title">{category}</h6>
        </div>
        <div className="card-body mycard-body">
          <h5 className="card-title mycard-title">{courseName}</h5>
          <p className="card-text tutorname">{fullname}</p>
          <div align="center" style={{ marginBottom: "15px" }}>
            <p className="card-text day border">{this.dayToString(day)}</p>
          </div>
          <Button
            onClick={() => this.onClickGotoCourseInform(courseid)}
            full={!this.props.detail.isAvailable}
          >
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
