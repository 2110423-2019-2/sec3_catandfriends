import React, { Component } from "react";
import "./StudentCard.css";
import history from "../history";
export default class StudentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://www.img.in.th/images/ced52db8eb1c2a59ab18b803b25e80c9.jpg",
      name: "ts",
      surname: "ts",
      comment: "You know when you know when you know when you know you know",
      email: "@@@",
      faceurl: "/kkk",
      bio:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      phoneNumber: "19891989",
    };
  }

  onClickChat = () => {
    history.push(`/chat?userId=${this.props.data._id}`);
  };

  render() {
    console.log(this.props.data);
    return (
      <div className="bigCard">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12  inside-block">
                <div className="textheader">Profile</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 " align="center">
                <img className="studentpicPro " id="photo4" />
              </div>
              <div className="col-md-8 ">
                <div className="row justify-content-center">
                  <div className="nameM">
                    <span id="nameK">
                      {this.props.data.firstName +
                        "\xa0\xa0\xa0\xa0" +
                        this.props.data.lastName}
                    </span>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div
                    className="col-md-12  inside-block"
                    style={{ marginBottom: "5px" }}
                  >
                    <div className="row">
                      <div className="col-md-4">
                        <div className="nameB">Phone Number:</div>
                      </div>
                      <div className="col-md-8">
                        <div className="valueB">
                          {this.props.data.phoneNumber}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="nameB">Birth Date:</div>
                      </div>
                      <div className="col-md-8">
                        <div className="valueB">
                          {this.props.data.birthDate.substring(0, 10)}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="nameB">Gender:</div>
                      </div>
                      <div className="col-md-8">
                        <div className="valueB">{this.props.data.gender}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <br />*/
      /*{ <p className="card-text">{this.props.data.bio}</p>
              <a href={this.props.data.faceurl}>Facebook</a>
              <body>Email: {this.props.data.email}</body>} */
      /*<body>Phone Number: {this.props.data.phoneNumber}</body>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
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
        var img = document.querySelector("#photo4");
        if (img) {
          img.src = imageUrl;
        }
      };
      xhr.send();
    } else {
      var img = document.querySelector("#photo4");
      img.src = "https://i.ibb.co/8NHMg4K/pic.png";
    }
  }
}
