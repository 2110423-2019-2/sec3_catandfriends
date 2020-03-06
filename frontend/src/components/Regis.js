import React, { Component } from "react";
import history from "../history";
import Nav from "./NavBar";
import "./Regis.css";
import { Form, Button, FormGroup, FormControl, Col } from "react-bootstrap";

export class Regis extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        className="card mb-3"
        /*style={{ maxWidth: "1000px", maxHeight: "400px" }}*/
      >
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="card-body">
              <div className="row border text-center" className="myStyle">
                <h3 className="card-title border">Create an account</h3>
              </div>
              <br />
              <div className="col">
                <Form>
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control placeholder="Firstname" />
                  </Form.Group>

                  <Form.Group controlId="formGridAddress2">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="Surname" />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>user type</Form.Label>
                      <Form.Control as="select">
                        <option>student</option>
                        <option>tutor</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Gender</Form.Label>
                      <Form.Control as="select">
                        <option>custom</option>
                        <option>Male</option>
                        <option>Female</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control placeholder="dd-mm-yyyy" />
                    </Form.Group>
                  </Form.Row>
                  
                  <Col className="myStyle">
                    <Button type="submit">Sign in</Button>
                  </Col>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Regis;
