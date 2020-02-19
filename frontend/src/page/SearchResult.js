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

  getFilter = () =>{
    let day = "";
    let subject = "";
    let time = "";
    let price = "";
    return
  }
  async componentDidMount() {
    console.log(window.location.search);
    let data = await Util.getSearchResult(window.location.search);
    await this.setState({ data });
    await console.log(data);
  }
}
