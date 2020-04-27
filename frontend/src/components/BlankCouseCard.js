import React from "react";
import "./BlankCouseCard.css";
import history from "../history";
import CourseCard from "./CourseCard";
import CourseButton from "./CourseButton";
import styled from "styled-components";
//import '@fortawesome/fontawesome-free';
const AddButton = styled(CourseButton)`
  background: rgba(255, 255, 255, 0.6);
  &:hover {
    background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
  }
`;
class BlankCard extends React.Component {
  render() {
    return (
      <div
        className="card mycard clickable background-color-trans"
      >
        <div
          id="image"
          className="mcard-headerS"
          // style={{ backgroundColor: "white" }}
        >
          <div style={{ height: "30px" }}>
            <div
              className="mcard-header--title"
              style={{ fontSize: "small", width: "100%" }}
            ></div>
          </div>
        </div>
        <div className="card-body mycard-body">
          <button className="button-white width90" onClick={() => this.onClickAddNewCourse()}>
            Create Course
          </button>
          <p className="card-text tutorname"></p>

          <div align="center" style={{ marginBottom: "5px" }}></div>
        </div>
      </div>
    );
  }

  onClickAddNewCourse = () => {
    history.push("/course/create");
  };
}

export default BlankCard;
