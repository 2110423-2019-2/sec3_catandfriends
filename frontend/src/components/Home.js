import React, { Component } from "react";
import NormalButton from "../components/NormalButton";
import "./Home.css";
import Util from "../apis/Util";
import history from "../history";
export class Home extends Component {
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
      <div className="justify-content-center">
        <div class="container block">
          <div className="row">
            <div className="col-md-6 justify-content-center" align="center">
              <img
                src="https://s3-ap-southeast-1.amazonaws.com/img-in-th/856030dc8f7609b974d03feb96d12b70.png"
                style={{ maxWidth: "400px", marginTop: "150px" }}
              />
              <div className="textstatic" style={{}}>
                "Nothing extraneous, everything intentional"
              </div>
              <div
                className="textstatic"
                style={{ fontSize: "24px", fontWeight: "700"}}
              >
                JOIN US NOW !
              </div>
            </div>
            <div className="col-md-6 justify-content-center" align="center">
              <div
                className="homebox"
                style={{ marginTop: "50px", marginBottom: "50px" }}
              >
                <div
                  className="textshadow"
                  style={{ fontSize: "24px", fontWeight: "700" }}
                >
                  <br />
                  Create an account
                </div>
                <br />
                <form
                  onSubmit={event => this.onclickGoToLogin(event)}
                  style={{ marginLeft: 30, marginRight: 30 }}
                >
                  <div className="row">
                    <input
                      className="inbox"
                      type="text"
                      value={this.state.firstName}
                      placeholder="First Name"
                      name="firstName"
                      style={{ width: "100%", marginBottom: "15px" }}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      className="inbox"
                      type="text"
                      value={this.state.lastName}
                      placeholder="Last Name"
                      style={{ width: "100%", marginBottom: "15px" }}
                      name="lastName"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      className="inbox"
                      type="password"
                      value={this.state.password}
                      placeholder="Password"
                      style={{ width: "100%", marginBottom: "15px" }}
                      name="password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <select
                      id="user"
                      name="Utype"
                      onChange={this.handleChange}
                      className="inbox"
                      style={{ width: "100%", marginBottom: "15px" }}
                    >
                      <option disabled>User Type</option>
                      <option value="tutor">Tutor</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <div className="row">
                    <input
                      className="inbox"
                      type="text"
                      value={this.state.SSN}
                      placeholder="SSN"
                      style={{ width: "100%", marginBottom: "15px" }}
                      name="SSN"
                      onChange={this.handleChange}
                      required
                      pattern="[0-9]{13}"
                      maxlength="13"
                    />
                  </div>
                  <div className="row">
                    <select
                      id="gender"
                      name="gender"
                      onChange={this.handleChange}
                      className="inbox"
                      style={{ width: "100%", marginBottom: "15px" }}
                    >
                      <option disabled>Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="row">
                    <input
                      className="inbox"
                      type="date"
                      value={this.state.Birthday}
                      placeholder="Birth Date"
                      style={{ width: "100%", marginBottom: "15px" }}
                      name="Birthday"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      className="inbox"
                      placeholder="Email Address"
                      type="email"
                      value={this.state.email}
                      style={{ width: "100%", marginBottom: "15px" }}
                      name="email"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      className="inbox"
                      type="tel"
                      value={this.state.phoneNumber}
                      placeholder="Phone Number"
                      style={{ width: "100%", marginBottom: "15px" }}
                      name="phoneNumber"
                      onChange={this.handleChange}
                      required
                      pattern="[0-9]{10}"
                      maxlength="10"
                    />
                  </div>
                  <br />
                  <div
                    className="text-center"
                    style={{ margin: "auto", marginBottom: "5px" }}
                  >
                    <button
                      color="none"
                      className="button-white"
                      type="submit"
                      borderColor="#00AA00"
                    >
                      Register Now
                    </button>
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

export default Home;
