import React, { Component } from 'react'

export default class EditStudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: "",
            firstName: "",
            lastName: "",
            password: "",
            newPassword: "",
            phoneNumber: "",
            bio: "",
            facebook: ""
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
          <div className="card mb-3 p-2" style={{maxWidth:800}}>
              <h3 className="card-title border text-center">Edit Student Profile</h3>
              <br/>
              <form onSubmit={e=>{
                  alert(JSON.stringify(this.state))
                  console.log(this.state)
                  e.preventDefault()
              }} style={{marginLeft:30}}>
              <div class="row">
                  <div class="col-md-6" width="100%">
                    <label>First Name<br/>
                  <input type="text" value={this.state.firstName} style={{width:250}} onChange={e=>this.setState({firstName:e.target.value})}/> 
                 </label> 
                 </div>
                  <div class="col-md-6">
                      <label>Last Name<br/>
                  <input type="text" value={this.state.lastName} style={{width:250}} onChange={e=>this.setState({lastName:e.target.value})} />
                  </label>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6" width="100%">
                    <label>Password<br/>
                  <input type="password" value={this.state.password} style={{width:250}} onChange={e=>this.setState({password:e.target.value})}/> 
                 </label> 
                 </div>
                  <div class="col-md-6">
                      <label>New Password<br/>
                  <input type="password" value={this.state.newPassword} style={{width:250}} onChange={e=>this.setState({newPassword:e.target.value})} />
                  </label>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6" width="100%">
                    <label>Phone Number<br/>
                  <input type="tel" value={this.state.phoneNumber} style={{width:250}} onChange={e=>this.setState({phoneNumber:e.target.value})}/> 
                 </label> 
                 </div>
                  <div class="col-md-6">
                      <label>Facebook<br/>
                  <input type="url" value={this.state.facebook} style={{width:250}} onChange={e=>this.setState({facebook:e.target.value})} />
                  </label>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6" width="100%">
                    <label>Bio<br/>
                  <textarea type="text" value={this.state.bio} style={{width:250}} onChange={e=>this.setState({bio:e.target.value})}/> 
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
