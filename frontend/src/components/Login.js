import React, { Component } from "react";
import history from "../history";
import "./Login.css";
import Util from "../apis/Util";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container">

        <form onSubmit={event => this.onClickLogin(event)}>
          <div className="container">
            <h1>Log in to your account</h1>
          </div>

          <div className="container">
            <div className="col">
              <label for="email" style={{ fontSize: "1.5em" }}>Email address</label>
              <input onChange={this.handleChange} name="email" value={this.state.email} type="email" className="form-control" style={{ maxWidth: "350px" }} id="email" placeholder="Enter email" required></input>
            </div>
          </div>

          <div className="container">
            <div className="col">
              <label for="password" style={{ fontSize: "1.5em" }}>Password</label>
              <input onChange={this.handleChange} name="password" value={this.state.password} type="password" className="form-control" style={{ maxWidth: "350px" }} id="password" placeholder="Password" onKeyDown={this.handleOnKeyDown} required></input>
            </div>
          </div>

          <div className="container">
            <br></br>
          </div>

          <div className="container">
            <div className="col">
              <button type="submit" id="submit" className="btn btn-primary" >Login</button>
            </div>
          </div>

        </form >
      </div >
    );
  }

  onClickLogin = async () => {
    console.log("click");

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let data = await Util.login(email, password);
    await console.log(data);
    if (data.errmsg) {
      window.alert(data.errmsg);
      window.location.reload();
      document.getElementById("password").value = "";
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      console.log(data);
      history.push("/profile");
      window.location.reload();
    }
  };

  handleOnKeyDown = event => {
    if (event.keyCode === 13) {
      document.getElementById("submit").click();
    }
  };
}

export default Login;
