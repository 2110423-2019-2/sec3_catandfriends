import React, { Component } from "react";
import TutorPage from "../page/TutorPage";
import StudentPage from "../page/StudentPage";

export class Home extends Component {
  state = { role: "tutor" };
  render() {
    if (this.state.role == "tutor") {
      return <TutorPage />;
    } else {
      return <StudentPage />;
    }
  }
}

export default Home;
