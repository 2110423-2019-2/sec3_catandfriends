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
              <br />
              <div class="row ">
                <div class="col-md-6 border">
                  <h4 style={{}}>{this.state.FirstName}</h4>
                </div>
                <div class="col-md-6 border">
                  <h4>{this.state.LastName}</h4>
                </div>

                <div class="col-md-4 border">
                  <br />
                  {/*Enter*/}
                  <br />

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
                <div class="col-md-8 border">
                  <br />
                  {/*Enter*/}
                  <br />

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
