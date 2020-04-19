import React, { Component } from "react";
import "./VerifyTutor.css";
import Util from "../apis/Util";
import axios from "axios";
import FileSaver from "file-saver";
import GradientButton from "./GradientButton";
export default class VerifyTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testQR:
        "https://s3-ap-southeast-1.amazonaws.com/img-in-th/baa3026e0bf6871a8fa693e78486ccd2.png",
      testQRLink: "https://www.taylorswift.com/",
    };
    this.onClickGetVeriFile = this.onClickGetVeriFile.bind(this);
  }
  getfile() {
    if (this.state.data.verificationDocument) {
      return (
        <span className="fileNameG" onClick={this.onClickGetVeriFile}>
          <i>download file</i>
        </span>
      );
    } else {
      return <span>-</span>;
    }
  }
  getImage() {
    if (this.state.data.verificationPayment) {
      return (
        <span className="fileNameB" onClick={this.onClickGetSlipImg}>
          <i>download file</i>
        </span>
      );
    } else {
      return <span>-</span>;
    }
  }
  render() {
    if (!this.state.data) {
      return (
        <div className="verifyTutorCard">
          <h3 className="verifyTutorH text-center">Verify Tutor</h3>
        </div>
      );
    } else {
      return (
        <div className="bigCard">
          <h3 className="inside-block text-center textheader">Verify Tutor</h3>
          <div className="row justify-content-center textnormal">
            To be able to create a course, your account have to be verified.
            <br></br>
          </div>
          <div className="row justify-content-center textnormal">
            We have to require 2 documents from you.
            <br></br>
          </div>
          <div className="row justify-content-center textnormal">
            1. your verification document 2. your verification payment.
            <br></br>
          </div>
          <div className="row justify-content-center textnormal">
            After receiving your documents, we will verify your account in 24
            hours.
            <br></br>
          </div>
          <div className="row " style={{ marginTop: "10px" }}>
            <div className="col-md-6 " style={{ marginBottom: "5px" }}>
              <div className="textheader">File</div>
              <div className="row">
                <div className="col-md-12 ">
                  <div className="row justify-content-center textnormal">
                    Please upload your verification document in PDF format.
                    <br></br>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-md-12 ">
                  <div className="textnormal text-bold">
                    {"Last uploaded file:" + "\xa0\xa0"}
                    {this.getfile()}
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-md-8 ">
                  <input
                    id="veridoc"
                    className="form-control-file p-1 textnormal"
                    type="file"
                    name="file"
                    accept=".pdf"
                    onChange={this.onChangeHandlerFile}
                  />
                </div>
                <div className="col-md-4 ">
                  <button
                    id="upload"
                    type="button"
                    className="btn btn-block btn-success btn-sm p-1"
                    onClick={this.onClickHandlerFile}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="textheader">Payment</div>
              <div className="row">
                <div className="col-md-12 textnormal">
                  <div className="row justify-content-center">
                    Please upload your verification payment in image format.
                    <br></br>
                  </div>
                  <div className="row justify-content-center">
                    You can scan QR code or link for payment below.
                  </div>
                  <div className="payDetail">
                    <GradientButton
                      type="button"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      color="#dbd65c"
                      gradient="linear-gradient(13deg, #5614b0, #dbd65c);"
                      style={{ margin: "20px" }}
                    >
                      QR Code Payment
                    </GradientButton>
                  </div>

                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            QR Code Payment
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <img src={this.state.testQR} />
                          <div className="row justify-content-center">
                            <a
                              className="fileNameB"
                              href={this.state.testQRLink}
                            >
                              <i>link here</i>
                            </a>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="textnormal text-bold">
                    {"Last uploaded slip image:" + "\xa0\xa0"}
                    {this.getImage()}
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-md-8 ">
                  <input
                    id="veridoc"
                    className="form-control-file p-1 textnormal"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={this.onChangeHandlerSlip}
                  />
                </div>
                <div className="col-md-4 ">
                  <button
                    id="upload"
                    type="button"
                    className="btn btn-block btn-primary btn-sm p-1"
                    onClick={this.onClickHandlerSlip}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  isImagefile(file) {
    const acceptedImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    return file && acceptedImageTypes.includes(file.type);
  }
  isDocfile(file) {
    const acceptedDocTypes = [
      "application/pdf",
      // "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    return file && acceptedDocTypes.includes(file.type);
  }
  onChangeHandlerFile = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loadedFile: 0,
    });
  };
  onChangeHandlerSlip = (event) => {
    this.setState({
      selectedSlip: event.target.files[0],
      loadedSilp: 0,
    });
  };
  onClickHandlerFile = () => {
    if (!this.state.selectedFile) {
      alert("Please select a file");
      return;
    }
    if (!this.isDocfile(this.state.selectedFile)) {
      alert("Your chosen file is not a PDF file");
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
      .then((res) => {
        // then print response status
        console.log(res.statusText);
        alert("File Uploaded");
        window.location.reload();
      });
  };
  onClickHandlerSlip = () => {
    if (!this.state.selectedSlip) {
      alert("Please select a file");
      return;
    }
    if (!this.isImagefile(this.state.selectedSlip)) {
      alert(
        "Your chosen file is not a JPG/PNG/GIF file" +
          this.state.selectedSlip.type
      );
      return;
    }
    const data = new FormData();
    data.append("file", this.state.selectedSlip);
    axios
      .post(
        `http://localhost:8000/file/paymentFile/verify/upload?token=${localStorage.getItem(
          "token"
        )}`,
        data,
        {
          // receive two    parameter endpoint url ,form data
        }
      )
      .then((res) => {
        // then print response status
        console.log(res.statusText);
        alert("File Uploaded");
        window.location.reload();
      });
  };
  onClickGetVeriFile = () => {
    axios({
      method: "GET",
      url: `http://localhost:8000/file/verifyFile?token=${localStorage.getItem(
        "token"
      )}&tutorId=${this.state.data._id}`,
      responseType: "blob",
    })
      .then((response) => {
        this.setState({ fileDownloading: true }, () => {
          FileSaver.saveAs(response.data, "your-veridoc.pdf");
        });
      })
      .then(() => {
        this.setState({ fileDownloading: false });
        console.log("Completed");
      });
  };
  onClickGetSlipImg = () => {
    axios({
      method: "GET",
      url: `http://localhost:8000/file/paymentFile/verify?token=${localStorage.getItem(
        "token"
      )}&tutorId=${this.state.data._id}`,
      responseType: "blob",
    })
      .then((response) => {
        this.setState({ imageDownloading: true }, () => {
          FileSaver.saveAs(response.data, "your-slip.jpg");
        });
        console.log(response);
      })
      .then(() => {
        this.setState({ imageDownloading: false });
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
