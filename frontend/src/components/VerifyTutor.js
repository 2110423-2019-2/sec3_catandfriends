import React, { Component } from "react";
import "./VerifyTutor.css";
import Util from "../apis/Util";
import axios from "axios";
import FileSaver from "file-saver";
export default class VerifyTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClickGetVeriFile = this.onClickGetVeriFile.bind(this);
  }
  getfile() {
    if (this.state.data.verificationDocument) {
      return <a onClick={this.onClickGetVeriFile}>Your File</a>;
      //   return (
      //     <a
      //       href={`http://localhost:8000/file/verifyFile?token=${localStorage.getItem(
      //         "token"
      //       )}&tutorId=${this.state.data._id}`}
      //     >
      //       Your File
      //     </a>
      //   );
    } else {
      return <div></div>;
    }
  }
  render() {
    if (!this.state.data) {
      return (
        <div className="verifyTutorCard">
          <p>{JSON.stringify(this.state.data)}</p>
          <h3 className="verifyTutorH text-center">Verify Tutor</h3>
        </div>
      );
    } else {
      return (
        <div className="verifyTutorCard">
          <h3 className="verifyTutorH text-center">Verify Tutor</h3>
          <div className="row border">
            <div className="col-md-6 border">
              <img src={this.state.imgsrc} />
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
                    {this.getfile()}
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
  }
  onddClickGetVeriFile = async () => {
    let veridoc = await Util.getVeriDoc(this.state.data._id);
    // await this.setState({ veridoc });
    console.log(JSON.stringify(veridoc));
  };
  onClickGetVeriFile = () => {
    axios({
      method: "GET",
      url: `http://localhost:8000/file/verifyFile?token=${localStorage.getItem(
        "token"
      )}&tutorId=${this.state.data._id}`,
      responseType: "blob"
    })
      .then(response => {
        console.log(response);
        this.setState({ fileDownloading: true }, () => {
          FileSaver.saveAs(response.data, "your-file.jpg");
        });
      })
      .then(() => {
        this.setState({ fileDownloading: false });
        console.log("Completed");
      });
  };
  async componentDidMount() {
    let params = new URLSearchParams(window.location.search);
    let data = await Util.getProfile(params.get("userId"));
    await this.setState({ data });
    await console.log(data);
    console.log(this.state);
  }
}
