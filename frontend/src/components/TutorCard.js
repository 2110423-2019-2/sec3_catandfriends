import React, { Component } from "react";
import "./TutorCard.css";
import history from "../history";
export default class TutorCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc: "https://i.ibb.co/8NHMg4K/pic.png"
    };
  }

  render() {
    // console.log(this.props.tutorid);
    return (
      <div
        className="card "
        style={{ width: "12rem", textAlign: "center", height: "330px" }}
      >
        <img src={this.state.imgsrc} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.tutorname}</h5>
          {/* <h3>{this.props.tutorid}</h3> */}
          <a
            className="btn btn-info text-light"
            onClick={() => this.onClickGotoTutorProfile(this.props.tutorid)}
          >
            Tutor's Profile
          </a>
        </div>
      </div>
    );
  }
  onClickGotoTutorProfile = tutorid => {
    history.push(`/profile?userId=${tutorid}`);
  };
}
