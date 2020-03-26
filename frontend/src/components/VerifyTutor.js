import React, { Component } from "react";
import "./VerifyTutor.css";
export default class VerifyTutor extends Component {
  render() {
    return (
      <div className="verifyTutorCard">
        <h3 className="verifyTutorH text-center">Verify Tutor</h3>
        <div className="row border">
          <div className="col-md-6 border">
            <h3>File</h3>
            <div className="row">
              <div className="col-md-12 border">
                <textarea className="fileDetail border">
                  this is detail this is detail this is detail this is detail
                  this is detail this is detail this is detail this is detail
                  this is detail this is detail this is detail this is detail
                  this is detail this is detail this is detail this is detail
                  this is detail this is detail this is detail this is detail
                </textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 border">
                <div className="nameV">
                  {"Last uploaded file:" + "\xa0\xa0"}
                  <a
                    href={`localhost:8000/file/verifyFile?token=${localStorage.getItem(
                      "token"
                    )}`}
                  >
                    file
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 border">
            <h3>Payment</h3>
          </div>
        </div>
      </div>
    );
  }
  onClickFile = () => {};
}
