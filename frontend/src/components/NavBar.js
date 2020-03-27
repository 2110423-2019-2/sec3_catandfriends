import React, { Component } from "react";
import history from "../history";
import "./NavBar.css";
import Util from "../apis/Util";
import AccountButton from "./AccountButton";
import NavButton from "./NavButton";
export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgjaa:
        "https://www.img.in.th/images/8517bda5f5991478fb667d1d086145ac.jpg",
      logoLight:
        "https://www.img.in.th/images/e67008d54a3a3f0bccaa782f25348e87.png",
      logoDark: "https://i.ibb.co/jM8cWXv/logoDark.png"
    };
    this.hover = this.hover.bind(this);
    this.unhover = this.unhover.bind(this);
  }
  hover() {
    document
      .getElementById("imgLogo")
      .setAttribute("src", this.state.logoLight);
  }
  unhover() {
    document.getElementById("imgLogo").setAttribute("src", this.state.logoDark);
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
        <a className="navbar-brand" onClick={() => this.onClickNavBar("/home")}>
          <img
            src={this.state.logoDark}
            style={{ marginRight: "10px" }}
            className="logoImg"
            alt="Logo"
            id="imgLogo"
            onMouseOver={this.hover}
            onMouseOut={this.unhover}
          />
          <span className="brandName">TutorHere</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            {!localStorage.getItem("token") ? (
              <li className="nav-item">
                <NavButton onClick={() => this.onClickNavBar("/register")}>
                  Register <span class="sr-only">(current)</span>
                </NavButton>
              </li>
            ) : (
              <div></div>
            )}
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <NavButton onClick={() => this.onClickNavBar("/search")}>
                  Search
                </NavButton>
              </li>
            ) : (
              <div></div>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {localStorage.getItem("token") ? (
              <li className="nav-item dropdown">
                {this.state.fullName ? (
                  <AccountButton
                    className="dropdown-toggle "
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {"㋛  " + this.state.fullName}
                    <span className="sr-only">(current)</span>
                  </AccountButton>
                ) : (
                  <div></div>
                )}
                <div
                  class="dropdown-menu bgDD"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a class="dropdown-item" href="/profile">
                    My Profile<span className="sr-only">(current)</span>
                  </a>
                  <a class="dropdown-item" href="/mycourse">
                    {this.state.role == "tutor"
                      ? "My Course & Request"
                      : "My Coourse & Schedule"}
                    <span className="sr-only">(current)</span>
                  </a>
                  <a
                    class="dropdown-item"
                    onClick={() => this.onClickNavBar("/logout")}
                  >
                    Sign Out<span className="sr-only">(current)</span>
                  </a>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <NavButton onClick={() => this.onClickNavBar("/login")} isOn>
                  Sign In
                </NavButton>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
  onClickNavBar = page => {
    if (page == "/register" || page == "/login") {
      history.push(page);
    } else if (page == "/logout") {
      localStorage.clear();
      history.push("/home");
      window.location.reload();
    } else if (!localStorage.getItem("token")) {
      window.alert("Please login first!");
      return history.push("./login");
    } else {
      history.push(page);
    }
  };
  async componentDidMount() {
    if (localStorage.getItem("token")) {
      let data = await Util.getProfile();
      // alert(JSON.stringify(data));
      this.setState({
        data,
        fullName: data.firstName + " " + data.lastName.substring(0, 1) + ".",
        role: data.role
      });
      console.log(this.state);
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ loggedin: nextProps.loggedin });
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.loggedin != this.state.loggedin;
  // }
}

export default NavBar;
