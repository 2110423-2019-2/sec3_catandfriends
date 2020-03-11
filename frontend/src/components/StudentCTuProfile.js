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
      <div
        className="card mb-3"
        style={{ maxWidth: "1000px", maxHeight: "400px" }}
      >
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
              <div className="row border text-center" className="myStyle">
                <h3 className="card-title border">Tutor Profile</h3>
              </div>
              <br />
              <div className="row ">
                <div className="col-md-6 border">
                  <h4 style={{}}>{this.props.data.firstName}</h4>
                </div>
                <div className="col-md-6 border">
                  <h4>{this.props.data.lastName}</h4>
                </div>

                <div className="col-md-4 border">
                  <br />
                  {/*Enter*/}
                  <br />
                  <body>
                    <strong>Gender : </strong>
                  </body>
                  <body>
                    <strong>Phone number : </strong>
                  </body>
                  <body>
                    <strong>Email : </strong>
                  </body>
                  <body>
                    <strong>Verify Status : </strong>
                  </body>
                  <br />
                  {/*Enter*/}
                  <br />
                </div>
                <div className="col-md-8 border">
                  <br />
                  {/*Enter*/}
                  <br />
                  <body> {this.props.data.gender}</body>
                  <body> {this.props.data.phoneNumber}</body>
                  <body> {this.props.data.email}</body>
                  <body
                    className={
                      this.props.data.verifyStatus ? "verified" : "notverified"
                    }
                  >
                    {this.props.data.verifyStatus ? "VERIFIED" : "NOT VERIFIED"}
                  </body>
                  <br />
                  {/*Enter*/}
                  <br />
                </div>
              </div>
              <br />
              {/*Enter*/}
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentCTuProfile;
