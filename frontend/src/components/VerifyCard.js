import React, { Component } from "react";
import axios from "axios";
import './VerifyCard.css'
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
      <div>
          <table>
            <tbody>
            <tr>
            <td colSpan="2" style={{textAlign:"center"}}>
                <label htmlFor="veridoc">Verification Document</label>
            </td>
            </tr>
            <tr>
                <td>
                  <input id="veridoc"  className="form-control-file"  type="file" name="file" onChange={this.onChangeHandler}/>
                </td>
                <td>
                  <button type="button" className="btn btn-success btn-sm" onClick={this.onClickHandler}>Upload </button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    );
  }
}
