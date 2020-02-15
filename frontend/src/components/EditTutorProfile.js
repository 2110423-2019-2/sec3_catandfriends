import React, { Component } from "react";

export default class EditTutorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      password: "",
      newPassword: "",
      phoneNumber: ""
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
        <h3 className="card-title border text-center">Edit Tutor Profile</h3>
        <br />
        <form
          onSubmit={e => {
            alert(JSON.stringify(this.state));
            console.log(this.state);
            e.preventDefault();
          }}
          style={{ marginLeft: 30 }}
        >
          <div class="row">
            <div class="col-md-6" width="100%">
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
            <div class="col-md-6">
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
          <div class="row">
            <div class="col-md-6" width="100%">
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
            <div class="col-md-6">
              <label>
                New Password
                <br />
                <input
                  type="password"
                  value={this.state.newPassword}
                  style={{ width: 250 }}
                  name="newPassword"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6" width="100%">
              <label>
                Phone Number
                <br />
                <input
                  type="tel"
                  value={this.state.phoneNumber}
                  style={{ width: 250 }}
                  name="phoneNumber"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div class="col-md-6">
              <label>
                Gender
                <br />
                <input
                  type="text"
                  value={this.state.Gender}
                  style={{ width: 250 }}
                  name="gender"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6" width="100%">
              <label>
                Bio
                <br />
                <textarea
                  type="text"
                  value={this.state.bio}
                  style={{ width: 250 }}
                  name="bio"
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
