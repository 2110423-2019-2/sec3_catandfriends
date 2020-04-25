import React, { Component } from "react";
import history from "../history";
import "./NavBar.css";
import Util from "../apis/Util";
import AccountButton from "./AccountButton";
import NavButton from "./NavButton";
import zIndex from "@material-ui/core/styles/zIndex";
export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgjaa:
        "https://www.img.in.th/images/8517bda5f5991478fb667d1d086145ac.jpg",
      logoLight:
        "https://www.img.in.th/images/e67008d54a3a3f0bccaa782f25348e87.png",
      logoDark: "https://i.ibb.co/jM8cWXv/logoDark.png",
    };
    this.hover = this.hover.bind(this);
    this.unhover = this.unhover.bind(this);
  }
  hover() {
    document.getElementById("imgLogo").setAttribute("src", this.state.logoDark);
  }
  unhover() {
    document
      .getElementById("imgLogo")
      .setAttribute("src", this.state.logoLight);
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-white ">
        <a className="navbar-brand" onClick={() => this.onClickNavBar("/home")}>
          <img
            src={this.state.logoLight}
            style={{ marginRight: "10px" }}
            className="logoImg"
            alt="Logo"
            id="imgLogo"
            // onMouseOver={this.hover}
            // onMouseOut={this.unhover}
          />
          <span className="brandName">TutorHere</span>
        </a>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class=" navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            {/* {!localStorage.getItem("token") ? (
              <li className="nav-item">
                <NavButton onClick={() => this.onClickNavBar("/register")}>
                  Register <span class="sr-only">(current)</span>
                </NavButton>
              </li>
            ) : (
              <div></div>
            )}  {localStorage.getItem("token") ? (
              <li className="nav-item">
                <NavButton onClick={() => this.onClickNavBar("/search")}>
                  Search
                </NavButton>
              </li>
            ) : (
              <div></div>
            )} */}
          </ul>
          <ul className="navbar-nav ml-auto">
            {/* {localStorage.getItem("token") ? (
              <li className="nav-item">
                <NavButton onClick={() => this.onClickNavBar("/chat")}>
                  Chat <span class="sr-only">(current)</span>
                </NavButton>
              </li>
            ) : (
              <div></div>
            )} */}
            {localStorage.getItem("token") ? (
              <li className="nav-item dropdown">
                {this.state.fullName ? (
                  <button
                    className="dropdown-toggle accountbtn button-white"
                    style={{ width: "fit-content !important" }}
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img id="photo" className="avatar" />
                    <span>{"\xa0" + this.state.fullName}</span>
                    <span className="sr-only">(current)</span>
                  </button>
                ) : (
                  <div></div>
                )}
                <div
                  class="dropdown-menu navbar-box"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a
                    class="dropdown-item textnormal"
                    onClick={() => this.onClickNavBar("/profile")}
                  >
                    My Profile<span className="sr-only">(current)</span>
                  </a>
                  {this.state.unverified ? (
                    <div></div>
                  ) : (
                    <a
                      class="dropdown-item textnormal"
                      onClick={() => this.onClickNavBar("/mycourse")}
                    >
                      {this.state.role == "tutor"
                        ? "My Course & Request"
                        : "My Course & Schedule"}
                      <span className="sr-only">(current)</span>
                    </a>
                  )}
                  {this.state.unverified ? (
                    <div></div>
                  ) : (
                    <a
                      class="dropdown-item textnormal"
                      onClick={() => this.onClickNavBar("/chat")}
                    >
                      Chat <span class="sr-only">(current)</span>
                    </a>
                  )}
                  <a
                    class="dropdown-item textnormal"
                    onClick={() => this.onClickNavBar("/logout")}
                  >
                    Sign Out<span className="sr-only">(current)</span>
                  </a>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="button-white"
                  style={{ width: "120px" }}
                  onClick={() => this.onClickNavBar("/login")}
                  isOn
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
  onClickNavBar = async (page) => {
    if (page == "/logout") {
      await localStorage.clear();
      history.push("/blank");
      window.location.reload();
    } else {
      history.push(page);
      // window.location.reload();
    }
  };
  async componentDidMount() {
    if (localStorage.getItem("token")) {
      let data = await Util.getProfile();
      // alert(JSON.stringify(data));
      this.setState({
        data,
        fullName: data.firstName + " " + data.lastName.substring(0, 1) + ".",
        role: data.role,
        unverified: data.role == "tutor" && !data.verifyStatus,
      });
      console.log(this.state);
    }
    if (!this.state.data || !this.state.data.profileImage) {
      var img = document.querySelector("#photo");
      if (img) {
        img.src = "https://i.ibb.co/8NHMg4K/pic.png";
      }
    } else {
      var xhr = new XMLHttpRequest();
      var myurl = "";
      xhr.open(
        "GET",
        `http://localhost:8000/file/images/user?token=${localStorage.getItem(
          "token"
        )}&userId=${this.state.data._id}`,
        true
      );
      xhr.responseType = "arraybuffer";
      xhr.onload = function(e, imageUrl) {
        var arrayBufferView = new Uint8Array(this.response);
        var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var img = document.querySelector("#photo");
        if (img) {
          img.src = imageUrl;
        }
      };
      xhr.send();
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
