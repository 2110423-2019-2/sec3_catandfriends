import React from "react";
import CourseCard from "./CourseCard";

class CourseCardLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row" style={{ maxWidth: "1100px" }}>
        {/* {this.state.rows.map(item => (
          <CourseCard detail={item} />
        ))} */}
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    );
  }
}

export default CourseCardLayout;
