import React, { Component } from "react";
import Filter from "../components/Filter";
import CourseCardLayout from "../components/CourseCardLayout";

export default class SearchResult extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <Filter />
          </div>
          <div className="col-md-10">
            <CourseCardLayout />
            {/* <CourseCardLayout />
            <CourseCardLayout />
            <CourseCardLayout /> */}
          </div>
        </div>
      </div>
    );
  }
}
