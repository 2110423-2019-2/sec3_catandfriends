import React, { Component } from "react";
import Filter from "../components/Filter";
import CourseCardLayout from "../components/CourseCardLayout";
import Util from "../apis/Util";

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSearch = async (data) => {
    await this.setState({ data });
  };
  render() {
    if (!this.state.data) {
      return (
        <div>
          <div className="row">
            <div className="col-md-3">
              <Filter search={this.onSearch} />
            </div>
            <div
              className="col-md-9"
              align="center"
            >
              <div className="row justify-content-center">
                <div
                  className="insidetrans-block textshadow"
                  style={{
                    marginTop: "20px",
                    padding: "5px 15px",
                    textAlign: "center",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: "12px",
                  }}
                >
                  {"Search Result: Loading..."}
                </div>
              </div>
              <CourseCardLayout data={[]} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-md-3">
              <Filter search={this.onSearch} />
            </div>
            <div
              className="col-md-9"
              align="center"
              style={{ maxWidth: "1200px" }}
            >
              <div className="row justify-content-center">
                <div
                  className="insidetrans-block textshadow"
                  style={{
                    marginTop: "20px",
                    padding: "5px 15px",
                    textAlign: "center",
                    color: "black",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: "12px",
                  }}
                >
                  {"Search Result: " +
                    this.state.data.length +
                    (this.state.data.length <= 1 ? " course" : " courses")}
                </div>
              </div>
              <CourseCardLayout data={this.state.data} />
            </div>
          </div>
        </div>
      );
    }
  }
  async componentDidMount() {
    console.log(window.location.search);
    let data = await Util.getSearchResult(
      "0000000",
      "0000",
      "00000000",
      "00000"
    );
    // let data = await Util.getSearchResult(window.location.search);
    await this.setState({ data });
    await console.log(data);
  }
}
