import React, { Component } from "react";
import history from "../history";

export default class LogInFirst extends Component {
  render() {
    alert("Please Log in first");
    history.push("/login");
    return <div></div>;
  }
}
