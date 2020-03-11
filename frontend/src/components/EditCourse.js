import React, { Component } from 'react'

export default class EditCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
          courseID:"",
          courseName:"",
          image:"",
          category:"",
          description:"",
          price:"",
          date:""
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
      handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
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
              <h3 className="card-title border text-center">Edit Course</h3>
              <br/>
              <form onSubmit={e=>{
                  alert(JSON.stringify(this.state))
                  console.log(this.state)
                  e.preventDefault()
              }} style={{marginLeft:30}}>
              <div class="row">
                  <div class="col-md-6" width="100%">
                    <label>Course Name<br/>
                  <input type="text" value={this.state.courseName} name="courseName" style={{width:262}} onChange={this.handleChange}/> 
                 </label> 
                 </div>
                  <div class="col-md-6">
                      <label>Category<br/>
                  <input type="text" value={this.state.category}  style={{width:262}} name="category" onChange={this.handleChange} />
                  </label>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6" width="100%">
                    <label>Start Date<br/>
                  <input type="Date" value={this.state.date} name="date" style={{width:262}} onChange={this.handleChange}/> 
                 </label> 
                 </div>
                  <div class="col-md-6">
                      <label>Price<br/>
                  <input type="number" value={this.state.price}  style={{width:262}} name="price" onChange={this.handleChange} />
                  </label>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6" width="100%" height="100px">
                    <label>Description<br/>
                  <textarea type="text"  value={this.state.description} style={{width:651 ,height:100,resize:"none"}} name="description" onChange={this.handleChange} /> 
                 </label> 
                 </div>
              </div>
              <br/>
             <div className="text-center" style={{marginRight:40}}>
                <input type="submit" value="Submit" className="btn btn-success" />
                <br></br>
                <br></br>
                <input type="delete" value="Delete this course" className="btn btn-danger"/>
            </div>
          </form> 
           </div>
        );
      }
}