import React, { Component } from "react";
import history from "../history";
import "./Login.css";
import Util from "../apis/Util";

export class Login extends Component {
  render() {
    return (
      <div className="login">
        <div>
          <span>{"Email : "}</span>
          <input type="text" id="email" placeholder="email"></input>
        </div>
        <div>
          <span>{"Password : "}</span>
          <input
            type="password"
            id="password"
            placeholder="password"
            onKeyDown={this.handleOnKeyDown}
          ></input>
        </div>
        <button id="Submit" onClick={this.onClickLogin}>
          Login
        </button>
      </div>
    );
  }

  onClickLogin = async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let data = await Util.login(email, password);
    if (data.error) {
      window.alert("email or password invalid");
      document.getElementById("password").value = "";
    } else {
      await localStorage.setItem("token", data.token);
      history.push("/profile");
    }
  };

  handleOnKeyDown = event => {
    if (event.keyCode === 13) {
      document.getElementById("Submit").click();
    }
  };
}

export default Login;
