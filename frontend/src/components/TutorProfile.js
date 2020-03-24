import React, { Component } from "react";
import "./TutorProfile.css";
import Util from "../apis/Util";
import history from "../history";
import NormalButton from "./NormalButton";
export class TutorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://www.img.in.th/images/3f2b15dc36aa6aa06ce42f1c1ed84a22.jpg",
      FirstName: "Nuttrawanee",
      LastName: "Kitwatthanachai",
      ssn: "1234567891234",
      birthdate: "1969-12-31T17:00:00.000+00:00",
      gender: "MaleFeMale",
      email: "hahaha",
      password: "password",
      premiumStatus: "false",
      verificationDocument: "link",
      PhoneNumber: "00000000",
      bio: "my bio"
    };
  }

  render() {
    return (
      <div className="bigCard border">
        <div className="row">
          <div className="col-md-4 border">
            <div className="row justify-content-center">
              <img className="picPro border p-3" src={this.state.imgsrc} />{" "}
            </div>
          </div>
          <div className="col-md-8 border">
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              <div className="col-md-12 border">
                <div className="headerB">My Profile</div>
              </div>
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              <div className="col-md-6 border">
                <div
                  className="nameB"
                  style={{ fontSize: "26px", textAlign: "center" }}
                >
                  {this.props.data.firstName}
                </div>
              </div>
              <div className="col-md-6 border">
                <div
                  className="nameB"
                  style={{ fontSize: "26px", textAlign: "center" }}
                >
                  {this.props.data.lastName}
                </div>
              </div>
            </div>

            <div className="row border" style={{ padding: "20px" }}>
              <div className="col-md-12 border infoC">
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">SSN:</div>
                  </div>
                  <div className="col-md-8 border">
                    <div className="valueB">{this.props.data.ssn}</div>
                  </div>
                </div>
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">Birth Date:</div>
                  </div>
                  <div className="col-md-8 b{order">
                    <div className="valueB">{this.props.data.birthDate}</div>
                  </div>
                </div>
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">Gender:</div>
                  </div>
                  <div className="col-md-8 border">
                    <div className="valueB">{this.props.data.gender}</div>
                  </div>
                </div>
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">Email:</div>
                  </div>
                  <div className="col-md-8 border">
                    <div className="valueB">
                      {this.props.data.email + " "}
                      <span style={{ fontWeight: "bold", color: "blue" }}>
                        {this.props.data.verified
                          ? "[verified]"
                          : "not verified"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">Phone Number:</div>
                  </div>
                  <div className="col-md-8 border">
                    <div className="valueB">{this.props.data.phoneNumber}</div>
                  </div>
                </div>
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">Verify status:</div>
                  </div>
                  <div className="col-md-8 border">
                    <div className="valueB">
                      {this.props.data.verifyStatus
                        ? "verified"
                        : "not verified"}
                    </div>
                  </div>
                </div>
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">Verify document:</div>
                  </div>
                  <div className="col-md-8 border">
                    <div className="valueB">
                      {this.props.data.verificationDocument
                        ? this.props.data.verificationDocument
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">Verify payment: ยังไม่มี back</div>
                  </div>
                  <div className="col-md-8 border">
                    <div className="valueB">
                      {this.props.data.verifyPayment}
                    </div>
                  </div>
                </div>
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">Premium status:</div>
                  </div>
                  <div className="col-md-8 border">
                    <div className="valueB">
                      {this.props.data.premiumStatus ? "Premium" : "Standard"}
                    </div>
                  </div>
                </div>
                <div className="row border">
                  <div className="col-md-4 border">
                    <div className="nameB">Premium payment: ยังไม่มี back</div>
                  </div>
                  <div className="col-md-8 border">
                    <div className="valueB">
                      {this.props.data.premiumPayment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row border justify-content-center"
              style={{ marginBottom: "10px" }}
            >
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
          </div>
        </div>
      </div>
    );
  }
}

export default TutorProfile;
