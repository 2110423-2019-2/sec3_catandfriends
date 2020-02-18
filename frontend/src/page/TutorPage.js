import React, { Component } from "react";
import TutorProfile from "../components/TutorProfile";
import VerifyCard from "../components/VerifyCard";
import RequestScrollBar from "../components/RequestScrollBar";
export default class TutorPage extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <div className="row justify-content-center">
          <TutorProfile />
        </div>
        <div className="row justify-content-center">
          <VerifyCard />
          <RequestScrollBar />
        </div>
      </div>
    );
  }
}
