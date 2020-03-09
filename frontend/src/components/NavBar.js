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

  // render() {
  //   return (
  //     <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
  //       <a className="navbar-brand" href="#">
  //         <img className="logoImg" src={this.state.imgjaa} alt="Logo" />
  //       </a>
  //       <h1>Tutor Here </h1>
  //       <small>beta</small>
  //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //         <ul className="navbar-nav mr-auto">
  //           <li className="nav-item active">
  //             <a class="nav-link" onClick={() => this.onClickNavBar("/")}>
  //               Home <span class="sr-only">(current)</span>
  //             </a>
  //           </li>
  //           <li className="nav-item active">
  //             <a class="nav-link" onClick={() => this.onClickNavBar("/search")}>
  //               Search <span class="sr-only">(current)</span>
  //             </a>
  //           </li>
  //           <li className="nav-item active ">
  //             <a
  //               className="nav-link"
  //               onClick={() => this.onClickNavBar(`/profile`)}
  //             >
  //               My profile <span className="sr-only">(current)</span>
  //             </a>
  //           </li>
  //           <li className="nav-item active ">
  //             <a
  //               className="nav-link"
  //               onClick={() => this.onClickNavBar("/logout")}
  //             >
  //               Log out <span className="sr-only">(current)</span>
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //     </nav>
  //   );
  // }

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" onClick={() => this.onClickNavBar("/")}>
          <img
            style={{ marginRight: "10px" }}
            className="logoImg"
            src={this.state.imgjaa}
            alt="Logo"
          />
          TutorHere
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" onClick={() => this.onClickNavBar("/")}>
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={() => this.onClickNavBar("/search")}>
                Search<span className="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item dropdown" style={{ float: "right" }}>
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Profile<span className="sr-only">(current)</span>
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a
                  class="dropdown-item"
                  onClick={() => this.onClickNavBar(`/profile`)}
                >
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
          </ul>
        </div>
      </nav>
    );
  }
  onClickNavBar = page => {
    if (page == "/logout") {
      localStorage.clear();
      history.push("/");
    } else {
      history.push(page);
    }
  };
}

export default NavBar;
