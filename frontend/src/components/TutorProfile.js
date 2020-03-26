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
  showPremium(premium) {
    let Premium;
    if (!premium) {
      Premium = (
        <NormalButton
          color="rgba(21, 171, 168,0.8)"
          onClick={() => {
            history.push(`/profile/premium`);
          }}
        >
          Upgrade Premium
        </NormalButton>
      );
      return Premium;
    } else {
      return;
    }
  }
  showVerify(verify) {
    let Verify;
    if (!verify) {
      Verify = (
        <NormalButton
          color="rgba(19, 124, 204,0.8)"
          onClick={() => {
            history.push(`/profile/verify`);
          }}
        >
          Verify Account
        </NormalButton>
      );
      return Verify;
    } else {
      return;
    }
  }
  render() {
    return (
      <div className="bigCard border">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12  infoC">
                <div className="headerB">My Profile</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 " align="center">
                <img className="picPro " src={this.state.imgsrc} />
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
              <div className="col-md-12  infoC" style={{ marginBottom: "5px" }}>
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
                      {this.props.data.verificationPayment + " ยังไม่มี back"}
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
                      {this.props.data.premiumPayment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.showWarn(this.props.data.verifyStatus)}
            <div
              className="row justify-content-center"
              // style={{ marginTop: "10px" }}
            >
              <div className="col-md-12">
                <NormalButton
                  color="rgba(107, 63, 233, 0.8)"
                  onClick={() => {
                    history.push(`/profile/edit`);
                  }}
                >
                  Edit Profile
                </NormalButton>
                {this.showVerify(this.props.data.verifyStatus)}
                {this.showPremium(this.props.data.premiumStatus)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TutorProfile;
