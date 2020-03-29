import React, { Component } from "react";
import "./EditTutorProfile.css";
import Util from "../apis/Util";
import NormalButton from "./NormalButton";
import history from "../history";
import Popup from "reactjs-popup";
import ImgDropAndCrop from "../components/ImgDropAndCrop";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default class EditTutorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      phoneNumber: "",
      showEditImage: false,
      imgCrop: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateThisImage = this.updateThisImage.bind(this);
    this.handleImageCropClose = this.handleImageCropClose.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(this.state));
    let data = await Util.editProfile(
      this.state.firstName,
      this.state.lastName,
      this.state.gender,
      this.state.phoneNumber,
      this.state.imgCrop,
      localStorage.getItem("token"),
    );
    console.log(data);
    if (!data.error) {
      alert("A profile is edited");
      console.log(data);
      history.push("/profile");
    } else {
      window.alert("Cannot Edit Profile");
    }
  }

  updateThisImage(imgCrop) {
    this.setState({ imgCrop: imgCrop })
    this.handleImageCropClose();
    console.log(imgCrop);
  }

  handleImageCropClose = () => this.setState({ showEditImage: false });
  handleImageCropShow = () => this.setState({ showEditImage: true });

  render() {
    return (
      <div className="editTutorProfileCard">
        <h3 className="editProfileH text-center">Edit Tutor Profile</h3>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-md-12">
            <div className="row justify-content-center">
              Croped picture
              </div>
            <div className="row justify-content-center" style={{ marginTop: "10px" }}>
              <img src={this.state.imgCrop}></img>
            </div>
            {/* <input
                id="veridoc"
                className="form-control-file"
                type="file"
                name="file"
                accept=".jpeg,.gif,.png"
                onChange={this.onChangeHandlerSlip}
                style={{ textAlign: "center" }}
              /> */}
            <NormalButton color="rgb(76, 182, 181)" onClick={this.handleImageCropShow}>
              Edit your picture
              </NormalButton>

            <div className="row justify-content-center" >
              <Modal show={this.state.showEditImage} onHide={this.handleImageCropClose} size="lg" style={{ overflow: "hidden" }}>
                <Modal.Body style={{ overflow: "auto" }}>
                  <div>
                    <ImgDropAndCrop updateThisImage={this.updateThisImage} handleImageCropClose={this.handleImageCropClose} />
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
        <form
          onSubmit={e => {
            alert(JSON.stringify(this.state));
            console.log(this.state);
            e.preventDefault();
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="nameV">
                {/* image */}
              </div>
            </div>
          </div>

          <div class="row" style={{ marginTop: "10px" }}>
            <div class="col-md-6">
              <label htmlFor="firstName" className="nameE">
                First Name
                <br />
                <input
                  id="firstName"
                  type="text"
                  value={this.state.firstName}
                  name="firstName"
                  style={{ width: 250 }}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div class="col-md-6">
              <label className="nameE" htmlFor="lastName">
                Last Name
                <br />
                <input
                  id="lastName"
                  type="text"
                  value={this.state.lastName}
                  style={{ width: 250 }}
                  name="lastName"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6" width="100%">
              <label className="nameE">
                Phone Number
                <br />
                <input
                  id="tel"
                  type="tel"
                  maxLength="10"
                  value={this.state.phoneNumber}
                  style={{ width: 250 }}
                  name="phoneNumber"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div class="col-md-6">
              <label className="nameE">
                Gender
                <br />
                <select
                  id="gender"
                  value={this.state.Gender}
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
              <NormalButton
                color="rgb(76, 182, 181)"
                type="submit"
                value="Submit"
              >
                Submit
              </NormalButton>
            </div>
          </div>
        </form>
      </div>
    );
  }

  async componentDidMount() {
    console.log(window.location.search);
    let params = new URLSearchParams(window.location.search);
    let data = await Util.getProfile(params.get("userId"));
    await this.setState(data);
    await console.log(data);
    console.log(this.state)
    console.log(localStorage.getItem("token"));
  }
}
