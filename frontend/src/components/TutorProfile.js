import React, { Component } from "react";
import "./TutorProfile.css";
export class TutorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://www.img.in.th/images/3f2b15dc36aa6aa06ce42f1c1ed84a22.jpg",
      tutorId: "123456789",
      FirstName: "Nuttrawanee",
      LastName: "Kitwatthanachai",
      ssn: "1234567891234",
      birthdate: "1969-12-31T17:00:00.000+00:00",
      gender: "MaleFeMale",
      email: "hahaha",
      password: "password",
      premiumStatus: "false",
      verificationDocument: "link",
      PhoneNumber: "00000000"
    };
  }

  render() {
    return (
      <div class="card mb-3" style={{ maxWidth: "1000px" }}>
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src={this.state.imgsrc}
              class="card-img p-3"
              style={{ maxWidth: "300px" }}
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div class="row border text-center" className="myStyle">
                <h3 class="card-title border">Tutor Profile</h3>
              </div>
              <div class="row ">
                <div class="col-md-4 border">
                  <h4 style={{}}>{this.state.FirstName}</h4>
                </div>
                <div class="col-md-4 border">
                  <h4>{this.state.LastName}</h4>
                </div>
                <div class="col-md-4 border">
                  <h4>{this.state.tutorId}</h4>
                </div>
                <div class="col-md-12 border">
                  <br />
                  {/*Enter*/}
                  <br />
                  <div class="row ">
                    <div class="col-md-4 border">
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
                        <strong>Password : </strong>
                      </body>
                      <body>
                        <strong>Premium status : </strong>
                      </body>
                      <body>
                        <strong>Verification document : </strong>
                      </body>
                      <body>
                        <strong>Phone number : </strong>
                      </body>
                    </div>
                    <div class="col-md-8 border">
                      <body>{this.state.ssn}</body>
                      <body>{this.state.birthdate}</body>
                      <body>{this.state.gender}</body>
                      <body>{this.state.email}</body>
                      <body>{this.state.password}</body>
                      <body>{this.state.premiumStatus}</body>
                      <body>{this.state.verificationDocument}</body>
                      <body>{this.state.PhoneNumber}</body>
                    </div>
                  </div>

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

export default TutorProfile;
