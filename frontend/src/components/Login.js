import React, { Component } from "react";

import "./Login.css";

export class Login extends Component {
  render() {
    return (
      <div className="login">
        <div>
          <span>{"Username : "}</span>
          <input type="text" id="username" placeholder="username"></input>
        </div>
        <div>
          <span>{"Password : "}</span>
          <input type="text" id="password" placeholder="password"></input>
        </div>
        <button id="Submit" onClick={this.onClickLogin}>
          Login
        </button>
      </div>
    );
  }

  onClickLogin = () => {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
  };
}

export default Login;
