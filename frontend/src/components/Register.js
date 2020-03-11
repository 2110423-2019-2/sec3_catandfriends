import React, { Component } from "react";
import history from "../history";
import Nav from "./NavBar";
import AddPhoto from "./AddPhoto";
import Util from "../apis/Util";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      gender: "Male",
      password: "",
      email: "",
      phoneNumber: "",
      Utype: "tutor",
      Birthday: "",
      SSN: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div
        className="card mb-3 p-4 bg-light border-secondary mb-1 "
        style={{ maxWidth: 800 }}
      >
        <h3 className="card-title border text-center bg-dark text-white ">
          Create an account
        </h3>
        <br />
        <form
          onSubmit={event => this.onclickGoToLogin(event)}
          style={{ marginLeft: 30 }}
        >
          <div className="row">
            <div className="col-md-6" width="100%">
              <label className="text-dark">
                First Name
                <br />
                <input
                  type="text"
                  value={this.state.firstName}
                  name="firstName"
                  style={{ width: 250 }}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label className="text-dark">
                Last Name
                <br />
                <input
                  type="text"
                  value={this.state.lastName}
                  style={{ width: 250 }}
                  name="lastName"
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" width="100%">
              <label className="text-dark">
                Password
                <br />
                <input
                  type="password"
                  value={this.state.password}
                  style={{ width: 250 }}
                  name="password"
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
            <div className="col-md-6" width="100%">
              <br />
              <label htmlFor="user" className="text-dark">
                User type
              </label>
              <select id="user" name="Utype" onChange={this.handleChange}>
                <option value="tutor">tutor</option>
                <option value="student">student</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" width="100%">
              <label className="text-dark">
                SSN
                <br />
                <input
                  type="text"
                  value={this.state.SSN}
                  placeholder="0123456789123"
                  style={{ width: 250 }}
                  name="SSN"
                  onChange={this.handleChange}
                  required
                  pattern="[0-9]{13}"
                  maxlength="13"
                />
              </label>
            </div>
            <div className="col-md-6">
              <br />
              <label htmlFor="gender" className="text-dark">
                Gender{" "}
              </label>
              <select id="gender" name="gender" onChange={this.handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" width="100%">
              <label className="text-dark">
                Birthday
                <br />
                <input
                  type="date"
                  value={this.state.Birthday}
                  placeholder="yyyy-mm-dd"
                  style={{ width: 250 }}
                  name="Birthday"
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label className="text-dark">
                Email
                <br />
                <input
                  placeholder="example@tutor.com"
                  type="email"
                  value={this.state.email}
                  style={{ width: 250 }}
                  name="email"
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 " width="100%">
              <label className="text-dark">
                Phone Number
                <br />
                <input
                  /*className = " border-secondary mb-1"*/
                  type="tel"
                  value={this.state.phoneNumber}
                  placeholder="0123456789"
                  style={{ width: 250 }}
                  name="phoneNumber"
                  onChange={this.handleChange}
                  required
                  pattern="[0-9]{10}"
                  maxlength="10"
                />
              </label>
            </div>
          </div>
          <br />
          <div className="text-center" style={{ marginRight: 40 }}>
            <input type="submit" value="Submit" className="btn btn-success" />
          </div>
        </form>
      </div>
    );
  }

  /*onClickSubmit = () =>{
    
  }*/
  async onclickGoToLogin(event) {
    console.log(this.state);
    event.preventDefault();
    let data = await Util.register(
      this.state.firstName,
      this.state.lastName,
      this.state.gender,
      this.state.password,
      this.state.email,
      this.state.phoneNumber,
      this.state.Utype,
      this.state.Birthday,
      this.state.SSN
    );
    console.log(data);
    if (data.errmsg) {
      window.alert(data.errmsg);
    } else {
      history.push(`/login`);
    }
  }
}

export default Register;
