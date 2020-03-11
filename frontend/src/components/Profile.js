import React, { Component } from "react";
import TutorPage from "../page/TutorPage";
import StudentPage from "../page/StudentPage";
import Util from "../apis/Util";

export class Home extends Component {
  state = { data: {} };

  render() {
    console.log(this.state.data);
    if (this.state.data.role == "tutor") {
      return <TutorPage owner={this.state.data.owner} data={this.state.data} />;
    } else {
      return (
        <StudentPage owner={this.state.data.owner} data={this.state.data} />
      );
    }
  }

  async componentDidMount() {
    console.log(window.location.search);
    let data = await Util.getProfile(window.location.search);
    await this.setState({ data });
    await console.log(data);
  }
}

export default Home;
