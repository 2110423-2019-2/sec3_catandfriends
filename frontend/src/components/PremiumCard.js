import React, { Component } from "react";
import axios from "axios";

export default class PremiumCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://s3-ap-southeast-1.amazonaws.com/img-in-th/352a5d02815c1e50649a6f2987bda26d.png"
      /*https://s3-ap-southeast-1.amazonaws.com/img-in-th/9f79ee3d9195d512adecddd66289b536.png*/
    };
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post(
        `http://localhost:8000/upload?token=${localStorage.getItem("token")}`,
        data,
        {
          // receive two    parameter endpoint url ,form data
        }
      )
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };

  render() {
    return (
      <div className="bigCard border">
        <div className="row">
          <div className="col-md-12  infoC">
            <div className="headerB">Premium Payment</div>
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
            <h4>350 bath</h4>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 ">
            <div class="container">
              <label /*className="bg-success text-white"*/>
                <input
                  id="bill"
                  className=" border border-dark"
                  //className="form-control-file p-1"
                  type="file"
                  name="file"
                  onChange={this.onChangeHandler}
                />

                <button
                  type="button"
                  className="btn btn-block btn btn-dark btn-sm p-1"
                  onClick={this.onClickHandler}
                >
                  comfirm your payment
                </button>
              </label>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div>- Thank you -</div>
          </div>
        </div>
      </div>
    );
  }
}
