import React, { Component } from "react";
import history from "../history";
import Nav from "./NavBar";
/*import FormControl from "react-bootstrap/lib/FormControl";
import { form, Button, FormGroup, FormControl, Col } from "react-bootstrap";
import form from "react-bootstrap-form";*/

export class AddPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <label>
          <input type="file" />
        </label>
      </div>
    );
  }
}

export default AddPhoto;
