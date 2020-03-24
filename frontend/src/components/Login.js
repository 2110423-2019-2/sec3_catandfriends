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
      <div className="whole justify-content-center">
        <div className="container-flex login">
          <form onSubmit={event => this.onClickLogin(event)}>
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
                  type="email"
                  id="email"
                  placeholder="email"
                  className="field"
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                  required
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
            <div className="row" style={{ marginTop: "10px" }}>
              <div class="col-md-12" align="right">
                <button
                  id="submit"
                  type="submit"
                  class="btn btn-success loginBtn"
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
