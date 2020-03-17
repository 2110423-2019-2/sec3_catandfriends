import React, { Component } from "react";
import history from "../history";
import "./NavBar.css";
import Util from "../apis/Util";
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
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => this.onClickNavBar("/search")}
                >
                  Search<span className="sr-only">(current)</span>
                </a>
              </li>
            ) : (
              <div></div>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {localStorage.getItem("token") ? (
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className="dropdown-toggle primaryBtn"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.fullName}
                  <span className="sr-only">(current)</span>
                </button>

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
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => this.onClickNavBar("/login")}
                >
                  Login <span className="sr-only">(current)</span>
                </a>
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
      history.push("/");
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
        fullName: data.firstName + " " + data.lastName.substring(0, 1) + "."
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
