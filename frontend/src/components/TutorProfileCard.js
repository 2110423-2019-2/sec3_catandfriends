import React,{Component} from 'react';
import './TutorProfileCard.css';
import mypic from './picture/bg-36.jpg';
export class TutorProfileCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imgsrc: mypic,
      FirstName: "Iceeee",
      LastName: "Kit",
      gender: "Male",
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
              <div class="row border text-center">
                <h3 class="card-title border">Profile</h3>
              </div>
              <div class="row ">
                <div class="col-md-12 border">
                  <br />
                    {/*Enter*/}
                  <br />
                  <body>    
                    <strong>First name : </strong> {this.state.FirstName}
                  </body>
                  <body>    
                    <strong>Last name : </strong> {this.state.LastName}
                  </body>
                  <body>    
                    <strong>Gender : </strong> {this.state.gender}
                  </body>
                  <body>    
                    <strong>Email : </strong> {this.state.email}
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

export default TutorProfileCard;