import React, { Component } from "react";
import "./StudentCard.css";
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
      phoneNumber: "19891989"
    };
  }

  render() {
    return (
      <div className="bigCard border" style={{ minHeight: "auto" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12  infoC">
                <div className="headerB">Profile</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 " align="center">
                <img className="studentpicPro " src={this.state.imgsrc} />
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
                    className="col-md-12  infoC"
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
}
