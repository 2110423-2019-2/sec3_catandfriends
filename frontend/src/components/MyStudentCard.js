import React, { Component } from "react";
import "./MyStudentCard.css";
import NormalButton from "./NormalButton";
import history from "../history";
export default class MyStudentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: "987654321",
      firstName: "Cat",
      lastName: "Dog",
      ssn: "9876543219876",
      birthDate: "1969-12-31",
      gender: "Female",
      email: "example@email.student",
      password: "password",
      phoneNumber: "0123456789",
      scheduleId: "0987654321",
      imgsrc: "https://i.ibb.co/8NHMg4K/pic.png",
      faceurl: "/kkk",
      bio:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
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
              <div className="row border text-center" className="mystyle">
                <h3 className="card-title border">My Profile</h3>
              </div>
              <br />
              <div className="row ">
                <div className="col-md-4 border">
                  <h4>{this.props.data.firstName}</h4>
                </div>
                <div className="col-md-4 border">
                  <h4>{this.props.data.lastName}</h4>
                </div>
                <div className="col-md-4 border">
                  <h4>{this.props.data.studentId}</h4>
                </div>
                <div className="col-md-12 border">
                  <br />
                  <br />
                  <div className="row">
                    <div class="col-md-4 border">
                      <strong>SSN : </strong>
                      <br />
                      <strong>Gender : </strong>
                      <br />
                      <strong>Email : </strong>
                      <br />
                      <strong>Phone Number : </strong>
                      <br />
                    </div>
                    <div class="col-md-8 border">
                      <body>{this.props.data.ssn}</body>
                      <body>{this.props.data.gender}</body>
                      <body>{this.props.data.email}</body>
                      <body>{this.props.data.phoneNumber}</body>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
              <br />
              <div className="mystyle">
                <NormalButton
                  color="rgba(107, 63, 233, 0.8)"
                  onClick={() => {
                    history.push(
                      `/profile/edit?token=${localStorage.getItem("token")}`
                    );
                  }}
                >
                  Edit Profile
                </NormalButton>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
