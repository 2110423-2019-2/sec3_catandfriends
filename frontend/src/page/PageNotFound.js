import React, { Component } from "react";
import "./PageNotFound.css";
export default class PageNotFound extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <div className="row">
          <div className="col-md-12" align="center">
            <div className="bigCardN homebox">
              <div className="row">
                <div className="col-md-12">
                  <div className="textheader" style={{ fontSize: "40px" }}>404: Page not found</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
