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
        "https://s3-ap-southeast-1.amazonaws.com/img-in-th/baa3026e0bf6871a8fa693e78486ccd2.png"
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
          <p>{JSON.stringify(this.state.data)}</p>
          <h3 className="verifyTutorH text-center">Verify Tutor</h3>
        </div>
      );
    } else {
      return (
        <div className="verifyTutorCard">
          <h3 className="verifyTutorH text-center">Verify Tutor</h3>
          <div className="row ">
            <div className="col-md-6 " style={{ marginBottom: "5px" }}>
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
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-md-8 ">
                  <input
                    id="veridoc"
                    className="form-control-file p-1"
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
              <h3>Payment</h3>
              <div className="row">
                <div className="col-md-12">
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
                          <p className="fileDetail ">
                            this is detail this is detail this is detail this is
                            detail this is detail this is detail this is detail
                            this is detail this is detail this is detail this is
                            detail this is detail this is detail this is detail
                            this is detail this is detail this is detail this is
                            detail this is detail this is detail
                          </p>
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
                  <div className="nameV">
                    {"Last uploaded slip image:" + "\xa0\xa0"}
                    {this.getImage()}
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-md-8 ">
                  <input
                    id="veridoc"
                    className="form-control-file p-1"
                    type="file"
                    name="file"
                    accept=".jpeg,.gif,.png"
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
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    return file && acceptedImageTypes.includes(file.type);
  }
  isDocfile(file) {
    const acceptedDocTypes = [
      "application/pdf"
      // "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    return file && acceptedDocTypes.includes(file.type);
  }
  onChangeHandlerFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loadedFile: 0
    });
  };
  onChangeHandlerSlip = event => {
    this.setState({
      selectedSlip: event.target.files[0],
      loadedSilp: 0
    });
  };
  onClickHandlerFile = () => {
    if (!this.state.selectedFile) {
      alert("Please select a file");
      return;
    }
    if (!this.isDocfile(this.state.selectedFile)) {
      alert(
        "Your chosen file is not a PDF/DOC/DOCX file" +
          this.state.selectedFile.type
      );
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
      .then(res => {
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
      responseType: "blob"
    })
      .then(response => {
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
      responseType: "blob"
    })
      .then(response => {
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