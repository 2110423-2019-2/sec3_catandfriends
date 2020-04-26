import React, { Component } from "react";
import "./EditTutorProfile.css";
import Util from "../apis/Util";
import NormalButton from "./NormalButton";
import history from "../history";
// import Popup from "reactjs-popup";
// import ImgDropAndCrop from "../components/ImgDropAndCrop";
// import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default class EditStudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      firstName: "",
      lastName: "",
      gender: "",
      phoneNumber: "",
      showEditImage: false,
      profileImage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.updateThisImage = this.updateThisImage.bind(this);
    // this.handleImageCropClose = this.handleImageCropClose.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    // alert(JSON.stringify(this.state));
    let data = await Util.editProfile(
      this.state._id,
      this.state.firstName,
      this.state.lastName,
      this.state.gender,
      this.state.phoneNumber,
      this.state.profileImage,
      localStorage.getItem("token")
    );
    // console.log("data"+data);
    if (!data.error) {
      alert("Your profile is edited");
      // console.log(data);
      history.push("/profile");
    } else {
      window.alert("Cannot Edit Profile");
    }
  }

  // updateThisImage(profileImage) {
  //   this.setState({ profileImage: profileImage });
  //   this.handleImageCropClose();
  //   // console.log(profileImage);
  //   const data = new FormData();
  //   data.append("file", this.state.profileImage);
  //   axios
  //     .post(
  //       `http://localhost:8000/file/images/user/upload?token=${localStorage.getItem(
  //         "token"
  //       )}`,
  //       data,
  //       {
  //         // receive two    parameter endpoint url ,form data
  //       }
  //     )
  //     .then((res) => {
  //       // then print response status
  //       // console.log(res.statusText);
  //       alert("File Uploaded");
  //     });
  // }

  // handleImageCropClose = () => this.setState({ showEditImage: false });
  // handleImageCropShow = () => this.setState({ showEditImage: true });

  render() {
    return (
      <div className="bigCard">
        <div className="inside-block textheader">Edit Student Profile</div>
        <div className="row" style={{ marginTop: "10px", padding: "20px" }}>
          <div className="col-md-3 justify-content-center inside-block">
            <div
              className="textshadow"
              style={{ paddingLeft: "0px", marginTop: "10px" }}
            >
              New profile image
            </div>
            <div
              className="row justify-content-center "
              style={{ padding: "10px 25px", marginTop: "20px" }}
            >
              <div className="col-md-12 justify-content-center ">
                <input
                  id="veridoc"
                  className="form-control-file p-1"
                  type="file"
                  name="file"
                  accept=".jpeg,.gif,.png"
                  onChange={this.onChangeHandlerSlip}
                />
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

          <div className="col-md-9">
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <div
                class="row"
                style={{ marginTop: "10px", textAlign: "center" }}
              >
                <div class="col-md-6">
                  <label className="textnormal" htmlFor="firstName">
                    First Name
                    <br />
                    <input
                      id="firstName"
                      type="text"
                      value={this.state.firstName}
                      className="field"
                      name="firstName"
                      style={{ width: 250 }}
                      onChange={this.handleChange}
                      required
                    />
                  </label>
                </div>

                <div class="col-md-6">
                  <label className="textnormal" htmlFor="lastName">
                    Last Name
                    <br />
                    <input
                      id="lastName"
                      type="text"
                      value={this.state.lastName}
                      className="field"
                      style={{ width: 250 }}
                      name="lastName"
                      onChange={this.handleChange}
                      required
                    />
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6" width="100%">
                  <label className="textnormal">
                    Phone Number
                    <br />
                    <input
                      id="tel"
                      type="tel"
                      maxLength="10"
                      value={this.state.phoneNumber}
                      className="field"
                      style={{ width: 250 }}
                      name="phoneNumber"
                      onChange={this.handleChange}
                      required
                      pattern="[0-9]{10}"
                    />
                  </label>
                </div>
                <div class="col-md-6">
                  <label className="textnormal">
                    Gender
                    <br />
                    <select
                      id="gender"
                      value={this.state.gender}
                      className="field"
                      style={{ width: 250 }}
                      name="gender"
                      onChange={this.handleChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="row text-center" style={{ marginTop: "20px" }}>
                <div className="col-md-12">
                  <button className="button-white" type="submit" value="Submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  onChangeHandlerSlip = (event) => {
    this.setState({
      selectedSlip: event.target.files[0],

      loadedSilp: 0,
    });
  };

  onClickHandlerSlip = async () => {
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
    console.log(data.get("file"));
    let img = await Util.uploadImage(data);
    if (!img.error) {
      console.log(img.statusText);
      alert("File Uploaded");
      window.location.reload();
    }
  };

  isImagefile(file) {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

    return file && acceptedImageTypes.includes(file.type);
  }

  async componentDidMount() {
    // console.log(window.location.search);
    let params = new URLSearchParams(window.location.search);
    let data = await Util.getProfile(params.get("userId"));
    await this.setState(data);
    // await console.log(data);
    // console.log(this.state)
    //console.log(localStorage.getItem("token"));
  }
}
