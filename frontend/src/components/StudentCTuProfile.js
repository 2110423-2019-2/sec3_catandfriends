import React, { Component } from "react";
import "./StudentCTuProfile.css";
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
      bio: "my bio"
    };
  }

  render() {
    return (
      <div className="bigCard border" style={{ minHeight: "auto" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12  infoC">
                <div className="headerB">Tutor Profile</div>
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
                          <span style={{ fontWeight: "bold", color: "blue" }}>
                            {this.props.data.verifyStatus
                              ? "VERIFIED"
                              : "NOT VERIFIED"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default StudentCTuProfile;
