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
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  render() {
    return (
      <div className="justify-content-center whole">
          <img
            src="https://s3-ap-southeast-1.amazonaws.com/img-in-th/65614bbe7828a059d67aba5eb33639ff.png"
            style={{ maxWidth: "300px" }}
          />
        <div className="container-flex homebox-login">
          <form onSubmit={event => this.onClickLogin(event)}>
            <div className="row">
              <div className="col-md-12" style={{ marginBottom: "20px" }}>
                <div className="textshadow" style={{ textAlign: "center" }}>
                  WELCOME
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="field"
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col-md-12">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  // onKeyDown={this.handleOnKeyDown}
                  className="field"
                  onChange={e => {
                    this.setState({ password: e.target.value });
                  }}
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "30px" }}>
              <div class="col-md-12" align="center">
                <button
                  id="submit"
                  type="submit"
                  class="button-white"
                >
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  onClickLogin = async event => {
    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let data = await Util.login(email, password);
    // await console.log(data);
    if (data.errmsg) {
      window.alert(data.errmsg);
      this.setState({ password: "" });
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
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
