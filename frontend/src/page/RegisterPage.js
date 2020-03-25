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
        <div className="row">
          <div className="col-md-12" align="center">
            <Register />
          </div>
        </div>
      </div>
    );
  }
}
