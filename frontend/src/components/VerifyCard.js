import React, { Component } from "react";
import axios from "axios";
import "./VerifyCard.css";
export default class VerifyCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null
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
      .post("http://localhost:8000/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };
  render() {
    return (
      <div className="vc">
        <div className="card" style={{width: "16rem"}}>
          <div className="card-body">
            <h5 className='card-title text-center'>Verify Document</h5>
            <input
              id="veridoc"
              className="form-control-file p-1"
              type="file"
              name="file"
              onChange={this.onChangeHandler}
            />
            <button
              type="button"
              className="btn btn-block btn-success btn-sm p-1"
              onClick={this.onClickHandler}
            >Upload</button>
          </div>
        </div>
      </div>
    );
  }
}
