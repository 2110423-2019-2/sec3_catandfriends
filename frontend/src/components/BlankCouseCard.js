import React from "react";
import "./BlankCouseCard.css";
import history from "../history";

//import '@fortawesome/fontawesome-free';

class BlankCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courseID: "",
      courseName: "",
      image: "",
      category: "",
      description: "",
      detail: ""
    };
  }
  render() {
    return (
      <div className="BlankCard" onClick={this.onClickAddNewCourse}>
        +
      </div>
    );
  }

  onClickAddNewCourse = () => {
    history.push("/course/create");
  };
}

export default BlankCard;
