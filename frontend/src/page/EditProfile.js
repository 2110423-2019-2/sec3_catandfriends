import React, { Component } from "react";
import Util from "../apis/Util";
import history from "../history";
import "./TutorPage.css";
import EditStudentProfile from "../components/EditStudentProfile";
import EditTutorProfile from "../components/EditTutorProfile";
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  render() {
    let tt;
    if (!this.state.data) {
      tt = <div></div>;
    } else if (this.state.data.role == "tutor") {
      tt = <EditTutorProfile />;
    } else if (this.state.data.role == "student") {
      tt = <EditStudentProfile />;
    }
    // console.log(this.state.data);
    return (
      <div className="justify-content-center">
        <div className="row">
          <div className="col-md-12" align="center">
            {tt}
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    // console.log(window.location.search);
    let params = new URLSearchParams(window.location.search);
    let data = await Util.getProfile(params.get("userId"));
    await this.setState({ data });
    // console.log(JSON.stringify(this.state.data));
    // console.log(localStorage.getItem("token"));
  }
}
