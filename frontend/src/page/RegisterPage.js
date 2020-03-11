import React, { Component } from "react";
import history from "../history";
import Util from "../apis/Util";
import Register from "../components/Register";

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="justify-content-center">
        <div className="row justify-content-center">
          <Register />
        </div>
        <div className="row justify-content-center"></div>
      </div>
    );
  }
}
