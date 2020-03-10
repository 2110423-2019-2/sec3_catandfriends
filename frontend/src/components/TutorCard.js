import React, { Component } from "react";
import "./TutorCard.css";
export default class TutorCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorname: "",
      imgsrc: "https://i.ibb.co/8NHMg4K/pic.png"
    };
  }

  render() {
    return (
      <div
        className="card "
        style={{ width: "12rem", textAlign: "center", height: "350px" }}
      >
        <img src={this.state.imgsrc} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.tutorname}</h5>
          <a className="btn btn-info text-light">Tutor's Profile</a>
        </div>
      </div>
    );
  }
}
