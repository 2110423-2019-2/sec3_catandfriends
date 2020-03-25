import React, { Component } from "react";
import "./EditTutorProfile.css";
import Util from "../apis/Util";
import NormalButton from "./NormalButton";
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

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    this.enablePass();
  }

  enablePass(){
    var fill = (document.getElementById("password").value=="");
    document.getElementById("newpassword").disabled=fill;
  }
  async handleSubmit(e) {
    alert(JSON.stringify(this.state));
    console.log(this.state);
    let data = await Util.editCourse(
      this.state._id,
      this.state.firstName,
      this.state.lastName,
      this.state.gender,
      this.state.password,
      this.state.newPassword,
      localStorage.getItem("token"),
    );
    e.preventDefault();
  }
  render() {
    return (
      <div className="editTutorProfileCard">
        <h3 className="editProfileH text-center">Edit Tutor Profile</h3>
        <br />
        <form
          onSubmit={e => this.handleSubmit(e)}
        >
          <div class="row ">
            <div class="col-md-6">
              <label htmlFor="firstName" className="nameE">
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
              <label className="nameE" htmlFor="lastName">
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
              <label className="nameE">
                Password
                <br />
                <input
                  id="password"
                  type="password"
                  value={this.state.password}
                  style={{ width: 250 }}
                  name="password"
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
            <div class="col-md-6">
              <label className="nameE">
                New Password
                <br />
                <input
                  id="newpassword"
                  type="password"
                  value={this.state.newPassword}
                  style={{ width: 250 }}
                  name="newPassword"
                  onChange={this.handleChange}
                  required
                  disabled 
                />
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6" width="100%">
              <label className="nameE">
                Phone Number
                <br />
                <input
                  id = "tel"
                  type="tel"
                  maxLength="10"
                  value={this.state.phoneNumber}
                  style={{ width: 250 }}
                  name="phoneNumber"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div class="col-md-6">
              <label className="nameE">
                Gender
                <br />
                <select
                  id = "gender"
                  value={this.state.Gender}
                  style={{ width: 250 }}
                  name="gender"
                  onChange={this.handleChange}
                >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row text-center" style={{ marginTop: "20px" }}>
            <div className="col-md-12">
              <NormalButton
                color="rgb(76, 182, 181)"
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
    await this.setState(data);
    await console.log(data);
    console.log(this.state)
    console.log(localStorage.getItem("token"));
  }
}
