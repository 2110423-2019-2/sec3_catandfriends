import React, { Component } from "react";
import "./EditTutorProfile.css";
import Util from "../apis/Util";
import NormalButton from "./NormalButton";
import history from "../history";
export default class EditTutorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
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
  }

  async handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(this.state));
    let data = await Util.editProfile(
      this.state.firstName,
      this.state.lastName,
      this.state.gender,
      this.phoneNumber,
      localStorage.getItem("token"),
    );
    console.log(data);
    if (!data.error) {
      alert("A profile is edited");
      console.log(data);
      history.push("/profile");
    } else {
      window.alert("Cannot Edit Profile");     
    }
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
