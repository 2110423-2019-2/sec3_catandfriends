import React, { Component } from "react";
import VerifyTutor from "../components/VerifyTutor";

export default class VerifyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="justify-content-center">
        <div className="row">
          <div className="col-md-12" align="center">
            <VerifyTutor />
          </div>
        </div>
      </div>
    );
  }
}
