import React, { Component } from "react";
import "./VerifyTutor.css";
import Util from "../apis/Util";
import axios from "axios";
import FileSaver from "file-saver";
import VerifyCard from "./VerifyCard";
export default class VerifyTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClickGetVeriFile = this.onClickGetVeriFile.bind(this);
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };
  onClickHandler = () => {
    if (!this.state.selectedFile) {
      alert("Please select a file");
      return;
    }
    if (this.state.selectedFile.type !== "application/pdf") {
      alert("Not a PDF");
      return;
    }
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post(
        `http://localhost:8000/file/verifyFile/upload?token=${localStorage.getItem(
          "token"
        )}`,
        data,
        {
          // receive two    parameter endpoint url ,form data
        }
      )
      .then(res => {
        // then print response status
        console.log(res.statusText);
        alert("Uploaded");
      });
  };
  getfile() {
    if (this.state.data.verificationDocument) {
      return (
        <span className="fileName" onClick={this.onClickGetVeriFile}>
          <i>Your File</i>
        </span>
      );
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
          <div className="row ">
            <div className="col-md-6 ">
              <img src={this.state.imgsrc} />
              <h3>File</h3>
              <div className="row">
                <div className="col-md-12 ">
                  <p className="fileDetail ">
                    this is detail this is detail this is detail this is detail
                    this is detail this is detail this is detail this is detail
                    this is detail this is detail this is detail this is detail
                    this is detail this is detail this is detail this is detail
                    this is detail this is detail this is detail this is detail
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 ">
                  <div className="nameV">
                    {"Last uploaded file:" + "\xa0\xa0"}
                    {this.getfile()}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 ">
                  <input
                    id="veridoc"
                    className="form-control-file p-1"
                    type="file"
                    name="file"
                    onChange={this.onChangeHandler}
                  />
                  <button
                    id="upload"
                    type="button"
                    className="btn btn-block btn-success btn-sm p-1"
                    onClick={this.onClickHandler}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 ">
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
        this.setState({ fileDownloading: true }, () => {
          FileSaver.saveAs(response.data, "your-file.pdf");
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
