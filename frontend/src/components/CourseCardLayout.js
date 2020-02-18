import React from "react";
import CourseCard from "./CourseCard";

class CourseCardLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [
        {
          courseID: "00001",
          courseName: "a",
          image: "https://source.unsplash.com/user/erondu/600x400",
          category: "few",
          description: "this is it",
          price: "4500",
          date: "Mondays 8.00-10.00"
        },
        {
          courseID: "00002",
          courseName: "b",
          image: "https://source.unsplash.com/user/erondu/600x400",
          category: "more",
          description: "TS",
          price: "4500",
          date: "Tuedays 8.00-10.00"
        }
      ],
      a: {
        courseID: "00002",
        courseName: "b",
        image: "https://source.unsplash.com/user/erondu/600x400",
        category: "more",
        description: "TS",
        price: "4500",
        date: "Wednesdays 8.00-10.00"
      }
    };
  }
  render() {
    return (
      <div className="row" style={{ maxWidth: "1100px" }}>
        {this.state.rows.map(item => (
          <CourseCard detail={item} />
        ))}
      </div>
    );
  }
}

export default CourseCardLayout;
