import React, { Component } from "react";
import "./EditStudentProfile.css";
import Util from "../apis/Util";
import NormalButton from "./NormalButton";
export default class EditStudentProfile extends Component {
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
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="editStudentProfileCard">
        <h3 className="editProfileS text-center">Edit Student Profile</h3>
        <br />
        <form
          onSubmit={e => {
            alert(JSON.stringify(this.state));
            console.log(this.state);
            e.preventDefault();
          }}
        >
          <div class="row ">
            <div class="col-md-6">
              <label htmlFor="firstName" className="nameS">
                First Name
                <br />
                <input
                  id="firstName"
                  type="text"
                  value={this.state.firstName}
                  name="firstName"
                  style={{ width: 250 }}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div class="col-md-6">
              <label className="nameS" htmlFor="lastName">
                Last Name
                <br />
                <input
                  id="lastName"
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
              <label className="nameS">
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
              <label className="nameS">
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
              <label className="nameS">
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
              <label className="nameS">
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
          <div className="row text-center" style={{ marginTop: "20px" }}>
            <div className="col-md-12">
              <NormalButton
                color="rgb(76, 90, 203)"
                type="submit"
                value="Submit"
              >
                Submit
              </NormalButton>
            </div>
          </div>
        </form>
      </div>
    );
  }
  async componentDidMount() {
    console.log(window.location.search);
    let params = new URLSearchParams(window.location.search);
    let data = await Util.getProfile(params.get("userId"));
    await this.setState({ data });
    await console.log(data);
    console.log(localStorage.getItem("token"));
  }
}
