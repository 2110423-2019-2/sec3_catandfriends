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
      imgsrc:
        "https://www.img.in.th/images/3f2b15dc36aa6aa06ce42f1c1ed84a22.jpg",
      faceurl: "/kkk",
      bio:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    };
  }

  render() {
    return (
      <div className="bigCard">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12  inside-block">
                <div className="textheader">My Profile</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 " align="center">
                <img className="picPro " id="photo3" />
              </div>
              <div className="col-md-8 ">
                <div className="nameM">
                  <span id="nameK">
                    {this.props.data.firstName +
                      "\xa0\xa0\xa0\xa0" +
                      this.props.data.lastName}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-12  inside-block"
                style={{ marginBottom: "5px" }}
              >
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">SSN:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">{this.props.data.ssn}</div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-4">
                    <div className="nameB">Birth Date:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.data.birthDate.substring(0, 10)}
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-4">
                    <div className="nameB">Gender:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">{this.props.data.gender}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Email:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">{this.props.data.email}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Phone Number:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">{this.props.data.phoneNumber}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="mystyle">
          <button
            className="button-white"
            onClick={() => {
              history.push(
                `/profile/edit?token=${localStorage.getItem("token")}`
              );
            }}
          >
            Edit Profile
          </button>
        </div>
        <br />
      </div>

      /*
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
                    <div className="col-md-4 border">
                      <strong>SSN : </strong>
                      <br />
                      <strong>Gender : </strong>
                      <br />
                      <strong>Email : </strong>
                      <br />
                      <strong>Phone Number : </strong>
                      <br />
                    </div>
                    <div className="col-md-8 border">
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
      </div>*/
    );
  }
  async componentDidMount() {
    if (this.props.data.profileImage) {
      var xhr = new XMLHttpRequest();
      var myurl = "";
      xhr.open(
        "GET",
        `http://${
          process.env.SERVERIP
        }:8000/file/images/user?token=${localStorage.getItem("token")}&userId=${
          this.props.data._id
        }`,
        true
      );
      xhr.responseType = "arraybuffer";
      xhr.onload = function(e, imageUrl) {
        var arrayBufferView = new Uint8Array(this.response);
        var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var img = document.querySelector("#photo3");
        if (img) {
          img.src = imageUrl;
        }
      };
      xhr.send();
    } else {
      var img = document.querySelector("#photo3");
      img.src = "https://i.ibb.co/8NHMg4K/pic.png";
    }
  }
}
