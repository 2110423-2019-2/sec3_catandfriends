import React, { Component } from "react";
import history from "../history";
import "./Login.css";
import Util from "../apis/Util";
export class Login extends Component {
  render() {
    return (
      <div className="whole justify-content-center">
        <div className="container-flex login">
          <div className="row">
            <div className="col-md-12" style={{ marginBottom: "20px" }}>
              <h2>Welcome!</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <h5>Email:</h5>
            </div>
            <div className="col-md-9">
              <input
                type="text"
                id="email"
                placeholder="email"
                className="field"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h5>Password:</h5>
            </div>
            <div className="col-md-8">
              <input
                type="password"
                id="password"
                placeholder="password"
                onKeyDown={this.handleOnKeyDown}
                className="field"
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "10px" }}>
            <div class="col-md-12" align="right">
              <button
                id="Submit"
                type="button"
                class="btn btn-success loginBtn"
                onClick={this.onClickLogin}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onClickLogin = async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (!email || !password) {
      alert("Email or password is not filled");
      return;
    }
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
