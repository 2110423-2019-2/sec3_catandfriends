import React, { Component } from "react";
import EnrollSchedule from "../components/EnrollSchedule";
import Util from "../apis/Util";
export default class MyCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.state.data) {
      return <div></div>;
    } else if (this.state.data.role == "tutor") {
      return <p>tutor</p>;
    } else if (this.state.data.role == "student") {
      //   return <p>student</p>;
      return <EnrollSchedule userId={this.state.data._id} />;
    }
  }
  async componentDidMount() {
    console.log(window.location.search);
    let params = new URLSearchParams(window.location.search);
    let data = await Util.getProfile(params.get("userId"));
    await this.setState({ data });
    await console.log(data);
    console.log(localStorage.getItem("token"));
  }
}
