import React, { Component } from "react";
import history from "../history";
import "./NavBar.css";
export class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgjaa:
        "https://www.img.in.th/images/8517bda5f5991478fb667d1d086145ac.jpg",
      loggedin: ""
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand"
          onClick={() => this.onClickNavBar("/register")}
        >
          <img
            style={{ marginRight: "10px" }}
            className="logoImg"
            src={this.state.imgjaa}
            alt="Logo"
          />
          TutorHere
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
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => this.onClickNavBar("/register")}
              >
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => this.onClickNavBar("/search")}
              >
                Search<span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown" id="MyAccount">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                My Account<span className="sr-only">(current)</span>
              </a>

              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a class="dropdown-item" href="/profile">
                  My Profile<span className="sr-only">(current)</span>
                </a>
                <a
                  class="dropdown-item"
                  onClick={() => this.onClickNavBar("/logout")}
                >
                  Log out<span className="sr-only">(current)</span>
                </a>
              </div>
            </li>
            <li id="Login">
              <a
                className="nav-link"
                onClick={() => this.onClickNavBar("/login")}
              >
                Login <span className="sr-only">(current)</span>
              </a>
            </li>
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
      history.push("/");
      window.location.reload();
    } else if (!localStorage.getItem("token")) {
      window.alert("Please login first!");
      return history.push("./login");
    } else {
      history.push(page);
    }
  };
  componentDidMount() {
    var x = document.getElementById("MyAccount");
    var y = document.getElementById("Login");
    if (this.props.loggedin) {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
      y.style.display = "block";
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loggedin: nextProps.loggedin });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.loggedin != this.state.loggedin;
  }
}

export default NavBar;
