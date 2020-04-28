import React, { Component } from "react";
import Util from "../apis/Util";
import Popup from "reactjs-popup";

export default class TypeComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Popup
        trigger={
          <a>
            <u className="textnormal">Report</u>
          </a>
        }
        position="center center"
        modal
        closeOnDocumentClick
      >
        {(close) => (
          <div className="p-4">
            <p>Please fill the information to report</p>
            <br />
            <form
              className="text-left"
              onSubmit={(event) => {
                this.handleSubmit(event, close);
              }}
            >
              <input
                type="radio"
                id="FalseInformationOnCourse"
                name="ReportingSubject"
                value="False Information On Course"
              />
              <label for="FalseInformationOnCourse">
                False Information On Course
              </label>
              <br />
              <input
                type="radio"
                id="Spam"
                name="ReportingSubject"
                value="Spam"
              />
              <label for="Spam">Spam</label>
              <br />
              <input
                type="radio"
                id="HateSpeech"
                name="ReportingSubject"
                value="Hate Speech"
              />
              <label for="HateSpeech">Hate Speech</label> <br />
              <input
                type="radio"
                id="Other"
                name="ReportingSubject"
                value="Other"
              />
              <label for="Other">Other</label>
              <br />
              <label>More information</label> <br />
              <textarea
                typr="text"
                id="message"
                className="pt-0 pl-0"
                style={{ height: "100px", width: "100%" }}
              ></textarea>
              <input
                type="submit"
                value="submit"
                className="float-right m-3"
              ></input>
            </form>
          </div>
        )}
      </Popup>
    );
  }

  handleSubmit = async (event, close) => {
    event.preventDefault();
    var subject = document.getElementsByName("ReportingSubject");
    console.log(subject);
    for (let i = 0; i < subject.length; i++) {
      if (subject[i].checked) {
        subject = subject[i].value;
        break;
      }
    }
    if (subject instanceof NodeList) {
      window.alert("Please select a subject");
      return;
    }
    var moreInfo = document.getElementById("message").value || "None";
    var data = { reportedUserId: this.props.reportedUserId, subject, moreInfo };
    console.log(data);
    var res = await Util.sendReport(data);
    if (!res.error) {
      window.alert("Sent Report");
      close();
    } else {
      window.alert("An error occured, please try again");
    }
  };
}
