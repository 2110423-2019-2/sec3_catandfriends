import React, { Component } from "react";
import history from "../history";
import "./NavBar.css";
export class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgjaa:
        "https://www.img.in.th/images/8517bda5f5991478fb667d1d086145ac.jpg"
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <a className="navbar-brand" href="#">
          <img className="logoImg" src={this.state.imgjaa} alt="Logo" />
        </a>
        <h1>Tutor Here </h1>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a class="nav-link" onClick={() => this.onClickNavBar("/")}>
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a class="nav-link" onClick={() => this.onClickNavBar("/search")}>
                Search <span class="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active ">
              <a
                className="nav-link"
                onClick={() => this.onClickNavBar("/profile")}
              >
                My profile <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active ">
              <a
                className="nav-link"
                onClick={() => this.onClickNavBar("/logout")}
              >
                Log out <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  onClickNavBar = page => {
    if ((page = "/logout")) {
      localStorage.clear();
      history.push("/");
    } else {
      history.push(page);
    }
  };
}

export default NavBar;
