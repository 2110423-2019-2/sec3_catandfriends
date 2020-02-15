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
                <h3 className="card-title border">Tutor Profile</h3>
              </div>
              <br />
              <div className="row ">
                <div className="col-md-6 border">
                  <h4 style={{}}>{this.state.FirstName}</h4>
                </div>
                <div className="col-md-6 border">
                  <h4>{this.state.LastName}</h4>
                </div>

                <div className="col-md-4 border">
                  <br />
                  {/*Enter*/}
                  <br />
                  <body>
                    <strong>Bio : </strong>
                  </body>
                  <body>
                    <strong>Gender : </strong>
                  </body>
                  <body>
                    <strong>Email : </strong>
                  </body>
                  <body>
                    <strong>Phone number : </strong>
                  </body>
                  <br />
                  {/*Enter*/}
                  <br />
                </div>
                <div className="col-md-8 border">
                  <br />
                  {/*Enter*/}
                  <br />
                  <body> {this.state.bio}</body>
                  <body> {this.state.gender}</body>
                  <body> {this.state.email}</body>
                  <body> {this.state.PhoneNumber}</body>
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
