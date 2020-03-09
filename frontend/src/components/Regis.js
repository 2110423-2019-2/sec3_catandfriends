import React, { Component } from "react";
import history from "../history";
import Nav from "./NavBar";
import AddPhoto from "./AddPhoto";

export class Regis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      password: "",
      email: "",
      phoneNumber: "",
      Utype: "",
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
      <div className="card mb-3 p-2" style={{ maxWidth: 800 }}>
        <h3 className="card-title border text-center">Create an account</h3>
        <br />
        <form
          onSubmit={e => {
            alert(JSON.stringify(this.state));
            console.log(this.state);
            e.preventDefault();
          }}
          style={{ marginLeft: 30 }}
        >
          <div className="row">
            <div className="col-md-6" width="100%">
              <label>
                First Name
                <br />
                <input
                  type="text"
                  value={this.state.firstName}
                  name="firstName"
                  style={{ width: 250 }}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                Last Name
                <br />
                <input
                  type="text"
                  value={this.state.lastName}
                  style={{ width: 250 }}
                  name="lastName"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" width="100%">
              <label>
                Password
                <br />
                <input
                  type="password"
                  value={this.state.password}
                  style={{ width: 250 }}
                  name="password"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="col-md-6" width="100%">
              <br />
              <label htmlFor="user">User type</label>
              <select id="user">
                <option value="tutor">tutor</option>
                <option value="student">student</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" width="100%">
              <label>
                SSN
                <br />
                <input
                  type="text"
                  value={this.state.SSN}
                  placeholder=""
                  style={{ width: 250 }}
                  name="SSN"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="col-md-6">
              <br />
              <label htmlFor="gender">Gender </label>
              <select
                id="gender"
                value={this.state.gender}
                onChange={this.handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" width="100%">
              <label>
                Birthday
                <br />
                <input
                  type="date"
                  value={this.state.Birthday}
                  placeholder="yyyy-mm-dd"
                  style={{ width: 250 }}
                  name="Birthday"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                Email
                <br />
                <input
                  type="text"
                  value={this.state.email}
                  style={{ width: 250 }}
                  name="email"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" width="100%">
              <label>
                Phone Number
                <br />
                <input
                  type="tel"
                  value={this.state.phoneNumber}
                  placeholder="0123456789"
                  style={{ width: 250 }}
                  name="phoneNumber"
                  onChange={this.handleChange}
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
}

export default Regis;
