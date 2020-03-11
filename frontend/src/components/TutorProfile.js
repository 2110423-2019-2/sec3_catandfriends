import React, { Component } from "react";
import "./TutorProfile.css";
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
              <div className="row border text-center" className="myStyle">
                <h3 className="card-title border">My Profile</h3>
              </div>
              <br />
              <div className="row ">
                <div className="col-md-4 border">
                  <h4 style={{}}>{this.props.data.firstName}</h4>
                </div>
                <div className="col-md-4 border">
                  <h4>{this.props.data.lastName}</h4>
                </div>
                <div className="col-md-4 border">
                  <h4></h4>
                </div>
                <div className="col-md-12 border">
                  <br />
                  {/*Enter*/}
                  <br />
                  <div className="row ">
                    <div className="col-md-4 border">
                      <body>
                        <strong>SSN : </strong>
                      </body>
                      <body>
                        <strong>Birth date : </strong>
                      </body>
                      <body>
                        <strong>Gender : </strong>
                      </body>
                      <body>
                        <strong>Email : </strong>
                      </body>
                      <body>
                        <strong>Premium status : </strong>
                      </body>
                      <body>
                        <strong>Phone number : </strong>
                      </body>
                      <body>
                        <strong>VerifiedDoc : </strong>
                      </body>
                    </div>
                    <div className="col-md-8 border">
                      <body>{this.props.data.ssn}</body>
                      <body>{this.props.data.birthDate.substring(0, 10)}</body>
                      <body>{this.props.data.gender}</body>
                      <body>{this.props.data.email}</body>
                      <body>
                        {this.props.data.premiumStatus ? "Yes" : "No"}
                      </body>
                      <body>{this.props.data.phoneNumber}</body>
                      <body>
                        {this.props.data.verificationDocument
                          ? this.props.data.verificationDocument
                          : "None"}
                      </body>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
              <br />
              <div className="myStyle">
                <button type="button" className="btn btn-outline-primary">
                  Edit Information
                </button>
              </div>
              {/*Enter*/}
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TutorProfile;
