import React, { Component } from "react";
import axios from "axios";
import Util from "../apis/Util";
import FileSaver from "file-saver";
export default class PremiumCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://s3-ap-southeast-1.amazonaws.com/img-in-th/352a5d02815c1e50649a6f2987bda26d.png"
      /*https://s3-ap-southeast-1.amazonaws.com/img-in-th/9f79ee3d9195d512adecddd66289b536.png*/
    };
  }
  onClickGetSlipImg = () => {
    axios({
      method: "GET",
      url: `http://localhost:8000/file/paymentFile/premium?token=${localStorage.getItem(
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
  isImagefile(file) {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    return file && acceptedImageTypes.includes(file.type);
  }
  getImage() {
    if (this.state.data.premiumPayment) {
      return (
        <span className="fileNameB" onClick={this.onClickGetSlipImg}>
          <i>download file</i>
        </span>
      );
    } else {
      return <span>-</span>;
    }
  }
  onChangeHandlerSlip = event => {
    this.setState({
      selectedSlip: event.target.files[0],
      loadedSilp: 0
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
        `http://localhost:8000/file/paymentFile/premium/upload?token=${localStorage.getItem(
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
  render() {
    if (!this.state.data) {
      return (
        <div className="bigCard" style={{ height: "600px" }}>
          <div className="row">
            <div className="col-md-12 inside-block">
              <div className="textheader">Premium Payment</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bigCard" style={{ height: "600px" }}>
          <div className="row">
            <div className="col-md-12  inside-block">
              <div className="textheader">Premium Payment</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <br />
              <img
                src={this.state.imgsrc}
                className="card-img p-3"
                style={{ maxWidth: "250px" }}
                alt="..."
              />
              <div className="textheader">350 baht</div>
              <br />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "5px" }}>
            <div className="col-md-12 justify-content-center">
              <div className="justify-content-center text-center textnormal text-bold">
                {"Last uploaded slip image:" + "\xa0\xa0"}
                {this.getImage()}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 ">
              <div class="container">
                <label /*className="bg-success text-white"*/>
                  <input
                    id="bill"
                    className=" border border-dark textnormal"
                    //className="form-control-file p-1"
                    type="file"
                    name="file"
                    onChange={this.onChangeHandlerSlip}
                  />

                  <button
                    id="upload"
                    type="button"
                    className="btn btn-block btn-sm p-1 button-white"
                    onClick={this.onClickHandlerSlip}
                  >
                    Upload slip
                  </button>
                </label>
              </div>
              {/* <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div>- Thank you -</div> */}
            </div>
          </div>
        </div>
      );
    }
  }
  async componentDidMount() {
    let params = new URLSearchParams(window.location.search);
    let data = await Util.getProfile(params.get("userId"));
    await this.setState({ data });
    await console.log(data);
    console.log(this.state);
  }
}
