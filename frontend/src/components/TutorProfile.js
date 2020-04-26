import React, { Component } from "react";
import "./TutorProfile.css";
import Util from "../apis/Util";
import history from "../history";
import VerifyCard from "./VerifyCard";
import NormalButton from "./NormalButton";
import FileSaver from "file-saver";
import axios from "axios";
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
      bio: "my bio",
    };
  }
  showWarn(warn) {
    let Warn;
    if (!warn) {
      Warn = (
        <div className="row justify-content-center">
          <p class="alert alert-warning" style={{ textAlign: "center" }}>
            <strong>Warning!</strong> You are an unverified tutor. You are not
            able to chat or create any courses.
          </p>
        </div>
      );
      return Warn;
    } else {
      return;
    }
  }
  showPremium(premium, verify) {
    let Premium;
    if (verify && !premium) {
      Premium = (
        <button
          className="button-white"
          onClick={() => {
            history.push(`/profile/premium`);
          }}
        >
          Upgrade Premium
        </button>
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
        <button
          className="button-white"
          onClick={() => {
            history.push(`/profile/verify`);
          }}
        >
          Verify Account
        </button>
      );
      return Verify;
    } else {
      return;
    }
  }
  onClickGetVeriFile = () => {
    axios({
      method: "GET",
      url: `http://localhost:8000/file/verifyFile?token=${localStorage.getItem(
        "token"
      )}&tutorId=${this.props.data._id}`,
      responseType: "blob",
    })
      .then((response) => {
        this.setState({ fileDownloading: true }, () => {
          FileSaver.saveAs(response.data, "your-veridoc.pdf");
        });
      })
      .then(() => {
        this.setState({ fileDownloading: false });
        console.log("Completed");
      });
  };
  onClickGetSlipImg = () => {
    axios({
      method: "GET",
      url: `http://localhost:8000/file/paymentFile/verify?token=${localStorage.getItem(
        "token"
      )}&tutorId=${this.props.data._id}`,
      responseType: "blob",
    })
      .then((response) => {
        this.setState({ imageDownloading: true }, () => {
          FileSaver.saveAs(response.data, "your-slip.jpg");
        });
        console.log(response);
      })
      .then(() => {
        this.setState({ imageDownloading: false });
        console.log("Completed");
      });
  };
  onClickGetSlipPremium = () => {
    axios({
      method: "GET",
      url: `http://localhost:8000/file/paymentFile/premium?token=${localStorage.getItem(
        "token"
      )}&tutorId=${this.props.data._id}`,
      responseType: "blob",
    })
      .then((response) => {
        this.setState({ imageDownloading: true }, () => {
          FileSaver.saveAs(response.data, "your-slip.jpg");
        });
        console.log(response);
      })
      .then(() => {
        this.setState({ imageDownloading: false });
        console.log("Completed");
      });
  };
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
                <img className="picPro " id="photo2" />
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
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Verify Status:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.data.verifyStatus ? (
                        <span style={{ fontWeight: "bold", color: "#00BFFF" }}>
                          VERIFIED
                        </span>
                      ) : (
                        <span style={{ fontWeight: "bold", color: "red" }}>
                          NOT VERIFIED
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="row">
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
                </div> */}
                {/* <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Verify payment:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.data.verificationPayment
                        ? this.props.data.verificationPayment
                        : "-"}
                    </div>
                  </div>
                </div> */}
                {this.props.data.verifyStatus && (
                  <div className="row">
                    <div className="col-md-4">
                      <div className="nameB">Verify Document:</div>
                    </div>
                    <div className="col-md-8">
                      <div className="valueB">
                        <div
                          className="fileNameG"
                          onClick={this.onClickGetVeriFile}
                        >
                          <i>download file</i>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {this.props.data.verifyStatus && (
                  <div className="row">
                    <div className="col-md-4">
                      <div className="nameB">Verify Payment:</div>
                    </div>
                    <div className="col-md-8">
                      <div className="valueB">
                        <div
                          className="fileNameB"
                          onClick={this.onClickGetSlipImg}
                        >
                          <i>download file</i>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Premium Status:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.data.premiumStatus ? (
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          PREMIUM
                        </span>
                      ) : (
                        <span
                          className="text-color"
                          style={{ fontWeight: "bold" }}
                        >
                          STANDARD
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {this.props.data.premiumStatus && (
                  <div className="row">
                    <div className="col-md-4">
                      <div className="nameB">Premium Payment:</div>
                    </div>
                    <div className="col-md-8">
                      <div className="valueB">
                        <div
                          className="fileNameB"
                          onClick={this.onClickGetSlipPremium}
                        >
                          <i>download file</i>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* <div className="row">
                  <div className="col-md-4">
                    <div className="nameB">Premium payment:</div>
                  </div>
                  <div className="col-md-8">
                    <div className="valueB">
                      {this.props.data.premiumPayment
                        ? this.props.data.premiumPaymen
                        : "-"}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {this.showWarn(this.props.data.verifyStatus)}
            <div
              className="row justify-content-center"
              // style={{ marginTop: "10px" }}
            >
              <div className="col-md-12">
                <button
                  className="button-white"
                  onClick={() => {
                    history.push(`/profile/edit`);
                  }}
                >
                  Edit Profile
                </button>
                {this.showVerify(this.props.data.verifyStatus)}
                {this.showPremium(
                  this.props.data.premiumStatus,
                  this.props.data.verifyStatus
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    let user = this.props.data;
    localStorage.setItem(
      "role",
      user.role == "student"
        ? "student"
        : user.verifyStatus
        ? "verifiedTutor"
        : "tutor"
    );
    if (user.role == "tutor") {
      localStorage.setItem("premium", user.premiumStatus ? "yes" : "no");
    }
    if (this.props.data.profileImage) {
      var xhr = new XMLHttpRequest();
      var myurl = "";
      xhr.open(
        "GET",
        `http://localhost:8000/file/images/user?token=${localStorage.getItem(
          "token"
        )}&userId=${this.props.data._id}`,
        true
      );
      xhr.responseType = "arraybuffer";
      xhr.onload = function(e, imageUrl) {
        var arrayBufferView = new Uint8Array(this.response);
        var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var img = document.querySelector("#photo2");
        if (img) {
          img.src = imageUrl;
        }
      };
      xhr.send();
    } else {
      var img = document.querySelector("#photo2");
      img.src = "https://i.ibb.co/8NHMg4K/pic.png";
    }
  }
}

export default TutorProfile;
