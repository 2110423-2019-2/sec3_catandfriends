import React, { Component } from "react";
import "./StudentCard.css";
export default class StudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc: "https://i.ibb.co/8NHMg4K/pic.png",
      name: "TS",
      surname: "TS",
      comment: "You know when you know when you know when you know you know",
      email: "@@@",
      faceurl: "/kkk"
    };
  }

  render() {
    return (
      <div class="card mb-3" style={{ maxWidth: "1000px" }}>
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src={this.state.imgsrc}
              class="card-img p-3"
              style={{ maxWidth: "300px" }}
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div class="row border text-center">
                <h3 class="card-title border">Profile</h3>
              </div>
              <div class="row ">
                <div class="col-md-6 border">
                  <h4 style={{ textAlign: "center" }}>{this.state.name}</h4>
                </div>
                <div class="col-md-6 border">
                  <h4>{this.state.surname}</h4>
                </div>
              </div>

              <br />
              <br />
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <a href={this.state.faceurl}>Facebook</a>
              <p>Email: {this.state.email}</p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
