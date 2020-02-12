import React,{Component} from 'react';
import './TutorProfile.css';
import mypic from './picture/bg-05.jpg';
export class TutorProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imgsrc: mypic,
      tutorId: "123456789",
      FirstName: "Nuttrawanee",
      LastName: "Kitwatthanachai",
      ssn : "1234567891234",
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
              <div class="row border text-center">
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
                  
                  <body>    
                    <strong>SSN : </strong> {this.state.ssn}
                  </body>
                  <body>    
                    <strong>Birth date : </strong> {this.state.birthdate}
                  </body>
                  <body>    
                    <strong>Gender : </strong> {this.state.gender}
                  </body>
                  <body>    
                    <strong>Email : </strong> {this.state.email}
                  </body>
                  <body>    
                    <strong>Password : </strong> {this.state.password}
                  </body>
                  <body>    
                    <strong>Premium status : </strong> {this.state.premiumStatus}
                  </body>
                  <body>    
                    <strong>Verification document : </strong> {this.state.verificationDocument}
                  </body>
                  <body>    
                    <strong>Phone number : </strong> {this.state.PhoneNumber}
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

export default TutorProfile;