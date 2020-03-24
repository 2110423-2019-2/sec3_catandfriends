import React, { Component } from "react";
import TutorPage from "../page/TutorPage";
import StudentPage from "../page/StudentPage";
import Util from "../apis/Util";

export class Home extends Component {
  state = { data: {} };

  render() {
    // window.location.reload();
    console.log(this.state.data);
    if (!this.state.data.role) {
      return <div>{/* <div>Loading...</div> */}</div>;
    } else {
      if (this.state.data.role == "tutor") {
        return (
          <TutorPage owner={this.state.data.owner} data={this.state.data} />
        );
      } else {
        console.log("This is me!");
        return (
          <StudentPage owner={this.state.data.owner} data={this.state.data} />
        );
      }
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

export default Home;
