import React, { Component } from "react";
import Filter from "../components/Filter";
import CourseCardLayout from "../components/CourseCardLayout";
import Util from "../apis/Util";

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  onSearch = async data => {
    await this.setState({ data });
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <Filter search={this.onSearch} />
          </div>
          <div
            className="col-md-10"
            align="center"
            style={{ maxWidth: "1200px" }}
          >
            <div className="row justify-content-center">
              <h2
                style={{
                  marginTop: "20px",
                  padding: "5px 15px",
                  textAlign: "center",
                  color: "black",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  borderRadius: "12px"
                }}
              >
                Search Result
              </h2>
            </div>
            <CourseCardLayout data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    console.log(window.location.search);
    let data = await Util.getSearchResult(window.location.search);
    await this.setState({ data });
    await console.log(data);
  }
}
