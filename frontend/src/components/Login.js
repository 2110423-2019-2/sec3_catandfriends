import React, { Component } from "react";
import history from "../history";
import "./Login.css";
import Util from "../apis/Util";

export class Login extends Component {
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
              <input type="email" className="form-control" style={{ maxWidth: "350px" }} id="email" placeholder="Enter email" width="50%" required></input>
            </div>
          </div>

          <div className="container">
            <div className="col">
              <label for="password" style={{ fontSize: "1.5em" }}>Password</label>
              <input type="password" className="form-control" style={{ maxWidth: "350px" }} id="password" placeholder="Password" onKeyDown={this.handleOnKeyDown} required></input>
            </div>
          </div>

          <div className="container">
            <br></br>
          </div>

          <div className="container">
            <div className="col">
              <button type="submit" id="button" className="btn btn-primary" >Login</button>
            </div>
          </div>

        </form >
      </div >
    );
  }

  onClickLogin = async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let data = await Util.login(email, password);
    await console.log(data);
    if (data.errmsg) {
      window.alert(data.errmsg);
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
      document.getElementById("Submit").click();
    }
  };
}

export default Login;
