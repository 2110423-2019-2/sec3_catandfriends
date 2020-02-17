import React, { Component } from 'react'

export default class NewCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: "",
            courseName: "",
            category:"",
            description: "",
            detail: ""
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
      }
    
      render() {
        return (
          <div className="card mb-3 p-2" style={{maxWidth:800}}>
              <h3 className="card-title border text-center">New Course</h3>
              <br/>
              <form onSubmit={e=>{
                  alert(JSON.stringify(this.state))
                  console.log(this.state)
                  e.preventDefault()
              }} style={{marginLeft:30}}>
              <div class="row">
                  <div class="col-md-6" width="100%">
                    <label>Course Name<br/>
                  <input type="text" value={this.state.courseName} name="courseName" style={{width:250}} onChange={this.handleChange}/> 
                 </label> 
                 </div>
                  <div class="col-md-6">
                      <label>Category<br/>
                  <input type="text" value={this.state.category}  style={{width:250}} name="category" onChange={this.handleChange} />
                  </label>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6" width="100%" height="100px">
                    <label>Short description<br/>
                  <input type="text" value={this.state.description} style={{width:500 ,height:100}} name="description" onChange={this.handleChange} /> 
                 </label> 
                 </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                      <label>Detail<br/>
                  <input type="text" value={this.state.detail} style={{width:500, height:100}} name="detail" onChange={this.handleChange}  />
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