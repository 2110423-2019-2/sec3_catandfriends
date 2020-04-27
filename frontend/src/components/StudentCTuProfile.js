import React, { Component } from "react";
import history from "../history";
import "./StudentCTuProfile.css";
import Util from "../apis/Util";
import NormalButton from "./NormalButton";
import ReportBox from "./ReportBox";

export class StudentCTuProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://www.img.in.th/images/10ee320e3f9646a722277a0029fd6844.jpg",
      FirstName: "Nuttrawanee",
      LastName: "Kitwatthanachai",
      gender: "MaleFeMale",
      email: "hahaha",
      PhoneNumber: "00000000",
      bio: "my bio",
    };
  }
  chat() {
    if (!this.state.me || !this.state.me.role) {
      return <div></div>;
    } else if (
      this.state.me.role == "student" &&
      this.props.data.verifyStatus
    ) {
      return (
        <button
          className="button-white width90"
          onClick={this.onClickChat}
          color="rgb(0, 255, 0)"
          textcolor="black"
        >
          Chat Now
        </button>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    return (
      <div
        className="bigCard"
        style={{ minHeight: "auto", marginBottom: "20px" }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12  inside-block">
                <div className="textheader">Tutor Profile</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 " align="center">
                <img className="studentpicPro " id="photo5" />
              </div>
              <div className="col-md-8 ">
                <div className="row justify-content-center">
                  <div className="col-md-9 ">
                    <div className="nameM">
                      <span id="nameK">
                        {this.props.data.firstName +
                          "\xa0\xa0\xa0\xa0" +
                          this.props.data.lastName}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3" style={{ paddingTop: "10px" }}>
                    {this.chat()}
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
                        <div className="nameB">Verify status:</div>
                      </div>
                      <div className="col-md-8">
                        <div className="valueB">
                          <span
                            style={{ fontWeight: "bold", color: "#00BFFF" }}
                          >
                            {this.props.data.verifyStatus
                              ? "VERIFIED"
                              : "NOT VERIFIED"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <ReportBox reportedUserId={this.props.data._id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    let me = await Util.getProfile();
    await this.setState({ me });
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
        var img = document.querySelector("#photo5");
        if (img) {
          img.src = imageUrl;
        }
      };
      xhr.send();
    } else {
      var img = document.querySelector("#photo5");
      img.src = "https://i.ibb.co/8NHMg4K/pic.png";
    }
  }
  onClickChat = () => {
    history.push(`/chat?userId=${this.props.data._id}`);
  };
}

export default StudentCTuProfile;
