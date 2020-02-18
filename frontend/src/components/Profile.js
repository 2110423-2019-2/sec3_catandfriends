import React, { Component } from "react";
import TutorPage from "../page/TutorPage";
import StudentPage from "../page/StudentPage";
import Util from "../apis/Util";

export class Home extends Component {
  state = { role: "tutor" };
  render() {
    if (this.state.role == "tutor") {
      return <TutorPage />;
    } else {
      return <StudentPage />;
    }
  }

  componentDidMount() {
    console.log(window.location.search);
    let data = Util.getProfile(window.location.search);
    console.log(data);
  }
}

export default Home;
