import React, { Component } from "react";
import "./TutorProfile.css";
import Util from "../apis/Util";
import history from "../history";
import VerifyCard from "./VerifyCard";
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
  showWarn(warn) {
    let Warn;
    if (!warn) {
      Warn = (
        <div className="row justify-content-center">
          <p class="alert alert-warning" style={{ textAlign: "center" }}>
            <strong>Warning!</strong> You are an unverified tutor. You are not
            able to create any courses.
          </p>
        </div>
      );
      return Warn;
    } else {
      return;
    }
  }
  render() {
    return (
      <div className="bigCard border">
        <div className="row">
          <div className="col-md-4 border">
            {/* <div className="row justify-content-center">
              <img className="picPro border p-3" src={this.state.imgsrc} />
            </div> */}
            <div className="row justify-content-center">
              <VerifyCard />
            </div>
            <div className="row justify-content-center">
              <VerifyCard />
            </div>
            <div className="row justify-content-center">
              <button type="button" className="btn btn-warning btn-block">
                Upgrade to Premium
              </button>
            </div>
            <div className="row justify-content-center">
              <VerifyCard />
            </div>

            <div className="row justify-content-center">
              <div>
                !!!!!!!!!!!ต้องเพิ่ม สำคัญ!!!!!!!!!! upload file/upload
                slip/payment button qr/upload payment slip
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12  infoC">
                <div className="headerB">My Profile</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 " align="center">
                <img className="picPro " src={this.state.imgsrc} />
              </div>
              <div className="col-md-4 ">
                <div
                  className="nameB"
                  style={{
                    fontSize: "26px",
                    textAlign: "center",
                    position: "absolute",
                    bottom: "40%"
                  }}
                >
                  {this.props.data.firstName}
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  className="nameB"
                  style={{
                    fontSize: "26px",
                    textAlign: "center",
                    position: "absolute",
                    bottom: "40%"
                  }}
                >
                  {this.props.data.lastName}
                </div>
              </div>
            </div>

            <div className="row" style={{ padding: "5px" }}>
              <div
                className="col-md-12  infoC"
                style={{ marginTop: "5px", marginBottom: "5px" }}
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
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Verify status:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      <span style={{ fontWeight: "bold", color: "blue" }}>
                        {this.props.data.verifyStatus
                          ? "VERIFIED"
                          : "NOT VERIFIED"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Verify document:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.data.verificationDocument
                        ? this.props.data.verificationDocument
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Verify payment:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.data.verifyPayment + " ยังไม่มี back"}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Premium status:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.data.premiumStatus ? "Premium" : "Standard"}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Premium payment:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.data.premiumPayment + " ยังไม่มี back"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.showWarn(this.props.data.verifyStatus)}
            <div
              className="row justify-content-center"
              style={{ marginTop: "10px" }}
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
