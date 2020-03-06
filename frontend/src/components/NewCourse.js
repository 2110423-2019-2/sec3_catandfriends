import React, { Component } from 'react'

export default class NewCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
          courseID:"",
          courseName:"",
          image:"",
          category:"",
          description:"",
          price:"",
          startDate:"",
          endDate:"",
          Monday:false,
          Tuesday:false,
          Wednesday:false,
          Thursday:false,
          Friday:false,
          Saturday:false,
          Sunday:false,
          ST0:null,
          ST1:null,
          ST2:null,
          ST3:null,
          ST4:null,
          ST5:null,
          ST6:null
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

      }
      // onSubmit={e=>{
      //   alert(JSON.stringify(this.state))
      //   console.log(this.state)
      //   console.log(localStorage.getItem("token"));

      //   e.preventDefault()
      
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

      handleSubmit(event) {
        alert(JSON.stringify(this.state));
        event.preventDefault();
      }

    
      render() {
        return (
          <div className="card mb-3 p-2" style={{maxWidth:800}}>
              <h3 className="card-title border text-center">New Course</h3>
              <br/>
              <form onSubmit={this.handleSubmit}
               style={{marginLeft:30}}>
              <div class="row">
                  <div class="col-md-6" width="100%">
                    <label>Course Name<br/>
                  <input type="text" value={this.state.courseName} name="courseName" onChange={this.handleChange} style={{width:262}} onChange={this.handleChange}/> 
                 </label> 
                 </div>
                  <div class="col-md-6">
                      <label>Category<br/>
                  <input type="text" value={this.state.category} onChange={this.handleChange}  style={{width:262}} name="category" onChange={this.handleChange} />
                  </label>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3" width="100%">
                    <label>Start Date<br/>
                  <input type="Date" value={this.state.startDate} onChange={this.handleChange} name="startDate"  onChange={this.handleChange}/> 
                 </label> 
                 </div>
                 <div class="col-md-3" width="100%">
                    <label>End Date<br/>
                  <input type="Date" value={this.state.endDate} onChange={this.handleChange} name="endDate"  onChange={this.handleChange}/> 
                 </label> 
                 </div>
                  <div class="col-md-3">
                      <label>Price<br/>
                  <input type="text" value={this.state.price} onChange={this.handleChange} style={{width:262}} name="price" onChange={this.handleChange} />
                  </label>
                  </div>
                  <div class="col-md-3">
                      <label>Student amount<br/>
                  <input type value={this.state.amount} onChange={this.handleChange} style={{width:262}} name="price" onChange={this.handleChange} />
                  </label>
                  </div>
              </div>
              <div class="row">
                <div class="col-md-3" width="100%">
                  <label htmlFor="Weekday">Week day
                    <div id="Weekday" style={{paddingTop:"5px"}}>
                      <input type="checkbox" name="Monday" value={this.Monday} onChange={this.handleChange}/>
                      <label htmlFor="Monday" style={{marginLeft:"10px", paddingTop:"2px" }}>Monday</label><br/>
                      <input type="checkbox" name="Tuesday" value={this.Tuesday} onChange={this.handleChange}/>
                      <label htmlFor="Tuesday" style={{marginLeft:"10px"}}>Tuesday</label><br/>
                      <input type="checkbox" name="Wednesday" value={this.Wednesday} onChange={this.handleChange}/>
                      <label htmlFor="Wednesday" style={{marginLeft:"10px"}}>Wednesday</label><br/>
                      <input type="checkbox" name="Thursday" value={this.Thursday} onChange={this.handleChange}/>
                      <label htmlFor="Thursday" style={{marginLeft:"10px"}}>Thursday</label><br/>
                      <input type="checkbox" name="Friday" value={this.Friday} onChange={this.handleChange}/>
                      <label htmlFor="Friday" style={{marginLeft:"10px"}}>Friday</label><br/>
                      <input type="checkbox" name="Saturday" value={this.Saturday} onChange={this.handleChange}/>
                      <label htmlFor="Saturday" style={{marginLeft:"10px"}}>Saturday</label><br/>
                      <input type="checkbox" name="Sunday" value={this.Sunday} onChange={this.handleChange}/>
                      <label htmlFor="Sunday" style={{marginLeft:"10px"}}>Sunday</label><br/>
                    </div>
                  </label>
                </div>
                <div class="col-md-3" width="100%">
                  <label htmlFor="StartTime">Start Time</label>
                  <div id="StartTime">
                    <input type="Time" name="ST0" value={this.ST0}style={{marginBottom:"2px"}} onChange={this.handleChange}/><br/>
                    <input type="Time" name="ST1" value={this.ST1}style={{marginBottom:"2px"}}/><br/>
                    <input type="Time" name="ST2" value={this.ST2}style={{marginBottom:"2px"}}/><br/>
                    <input type="Time" name="ST3" value={this.ST3}style={{marginBottom:"2px"}}/><br/>
                    <input type="Time" name="ST4" value={this.ST4}style={{marginBottom:"2px"}}/><br/>
                    <input type="Time" name="ST5" value={this.ST5}style={{marginBottom:"2px"}}/><br/>
                    <input type="Time" name="ST6" value={this.ST6}style={{marginBottom:"2px"}}/><br/>
                  </div>
        
                </div>
                <div class="col-md-3" width="100%">
                <label htmlFor="EndTime">End Time</label>
                  <div id="EndTime">
                    <input type="Time"style={{marginBottom:"2px"}}/><br/>
                    <input type="Time"style={{marginBottom:"2px"}}/><br/>
                    <input type="Time"style={{marginBottom:"2px"}}/><br/>
                    <input type="Time"style={{marginBottom:"2px"}}/><br/>
                    <input type="Time"style={{marginBottom:"2px"}}/><br/>
                    <input type="Time"style={{marginBottom:"2px"}}/><br/>
                    <input type="Time"style={{marginBottom:"2px"}}/><br/>
                  </div>
                </div>
              </div>
              
              <div class="row">
                  <div class="col-md-6" width="100%" height="100px">
                    <label>Description<br/>
                  <textarea type="text" value={this.state.description} onChange={this.handleChange} style={{width:651 ,height:100,resize:"none"}} name="description" onChange={this.handleChange} /> 
                 </label> 
                 </div>
              </div>
              <br/>
             <div className="text-center" style={{marginRight:40}}>
            <input type="submit" value="Submit" className="btn btn-success"/>
                </div>
          </form> 
           </div>
        );
      }
}