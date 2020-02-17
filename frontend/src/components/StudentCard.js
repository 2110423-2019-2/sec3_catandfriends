import React, { Component } from "react";
import "./StudentCard.css";
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
      bio: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      phoneNumber: "19891989"
    };
  }

  render() {
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
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="row border mystyle text-center" className="mystyle">
                <h3 className="card-title border">Student Profile</h3>
              </div>
              <br/>
              <div className="row ">
                <div className="col-md-6 border">
                  <h4>{this.state.name}</h4>
                </div>
                <div className="col-md-6 border">
                  <h4>{this.state.surname}</h4>
                </div>
              </div>
              <br />
              <p className="card-text">{this.state.bio}</p>
              <a href={this.state.faceurl}>Facebook</a>
              <body>Email: {this.state.email}</body>
              <body>Phone Number: {this.state.phoneNumber}</body>
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
