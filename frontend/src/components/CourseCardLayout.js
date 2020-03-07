import React from "react";
import CourseCard from "./CourseCard";

class CourseCardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [
        {
          courseID: "1989",
          courseName: "a",
          image: "https://source.unsplash.com/user/erondu/600x400",
          category: "few",
          description: "this is it",
          price: "4500",
          date: "Mondays 8.00-10.00"
        },
        {
          courseID: "1989",
          courseName: "a",
          image: "https://source.unsplash.com/user/erondu/600x400",
          category: "few",
          description: "this is it",
          price: "4500",
          date: "Mondays 8.00-10.00"
        }
      ],
      data: this.props.data
    };
  }
  render() {
    return (
      <div
        className="row border"
        style={{ maxWidth: "1100px", paddingLeft: "22px", marginTop: "22px" }}
      >
        {this.state.data.map(item => (
          <CourseCard detail={item} />
        ))}
      </div>
    );
  }
}

export default CourseCardLayout;
