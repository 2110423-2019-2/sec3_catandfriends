import React, { Component } from "react";
import Nav from "./NavBar";
import Regis from "./Regis";

export class RegisPage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <center>
          <br />
          <Regis />
        </center>
      </div>
    );
  }
}

export default RegisPage;
