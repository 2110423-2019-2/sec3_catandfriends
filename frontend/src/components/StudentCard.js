import React, { Component } from "react";
import "./StudentCard.css";
import history from "../history";
export default class StudentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc: "https://i.ibb.co/8NHMg4K/pic.png",
      name: "ts",
      surname: "ts",
      comment: "You know when you know when you know when you know you know",
      email: "@@@",
      faceurl: "/kkk",
      bio:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      phoneNumber: "19891989"
    };
  }

  onClickChat = () => {
    history.push(`/chat?userId=${this.props.data._id}`);
  };

  render() {
    console.log(this.props.data);
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
            <button onClick={this.onClickChat}>Chat now</button>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div
                className="row border mystyle text-center"
                className="mystyle"
              >
                <h3 className="card-title border">Student Profile</h3>
              </div>
              <br />
              <div className="row ">
                <div className="col-md-6 border">
                  <h4>{this.props.data.firstName}</h4>
                </div>
                <div className="col-md-6 border">
                  <h4>{this.props.data.lastName}</h4>
                </div>
              </div>
              <br />
              {/* <p className="card-text">{this.props.data.bio}</p>
              <a href={this.props.data.faceurl}>Facebook</a>
              <body>Email: {this.props.data.email}</body> */}
              <body>Phone Number: {this.props.data.phoneNumber}</body>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
