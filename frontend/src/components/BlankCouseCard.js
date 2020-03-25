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
    background: linear-gradient(90deg, #a67ca8 0%, #4d65a6 100%);
  }
`;
class BlankCard extends React.Component {
  render() {
    return (
      <div
        className="card mycard clickable"
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
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
          <AddButton onClick={() => this.onClickAddNewCourse()}>
            Create Course
          </AddButton>
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
