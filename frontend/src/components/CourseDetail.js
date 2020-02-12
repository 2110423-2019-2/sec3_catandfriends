import React,{Component} from 'react';
import mypic from './picture/bg-01.jpg';
import './CourseDetail.css';
export class CourseDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imgsrc: mypic,
      courseId: "123456789",
      courseName: "A",
      dayAndtime: "friday 10:00-12:00",
      startDate: "1970-01-20 T17:00:00.000+00:00",
      endDate: "1970-01-29 T17:00:00.000+00:00",
      tutorId: "123456789",
      amountOfStudent: "5",
      description: "just enroll this course and you will get nothing"
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
                <h3 class="card-title border">Course Details</h3>
              </div>
              <div class="row">
                <div class="col-md-6 border">
                  <h4 style={{/* textAlign: "center"*/ }}>{this.state.courseName}</h4>
                </div>
                <div class="col-md-6 border">
                  <h4>{this.state.courseId}</h4>
                </div>
              
                <div class="col-md-12 border">
                    <br />
                      {/*Enter*/}
                    <br />
                    <body>    
                      <strong>Day and Time : </strong> {this.state.dayAndtime}
                    </body>
                    <body>    
                      <strong>Start day : </strong> {this.state.startDate}
                    </body>
                    <body>    
                      <strong>End day : </strong> {this.state.endDate}
                    </body>
                    <body>    
                      <strong>tutor Id : </strong> {this.state.tutorId}
                    </body>
                    <h6>should we show the tutor name?</h6>
                    <br />
                      {/*Enter*/}
                    <br />
                </div>
              
                <div class="col-md-12 border">
                  <br />
                  <br />  
                  <p class="card-text">{this.state.description}
                    {/*This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.*/}
                  </p>
                  
                  
                </div>

                <div class="col-md-12 border">
                  <div class="alert alert-warning">
                    <strong>Warning!</strong> If you request to enroll this course.....
                  </div>
                  <button 
                    type="button" 
                    class="btn btn-outline-success">Request
                  </button>
                  <button 
                    type="button" 
                    data-toggle="button" 
                    aria-pressed="false" 
                    autocomplete="off"
                    aria-pressed="true"
                    class="btn btn-primary" >Request
                  </button>
                  <br />
                  <br />
                </div>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;