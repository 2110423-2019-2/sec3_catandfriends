import React, { Component } from "react";
import axios from "axios";
import history from "../history";

export default class PremiumCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: "https://www.img.in.th/images/49423b7323121af8abe9634efe7f8c9b.png"
    };
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div className="vc">
        <div className="card" style={{ width: "16rem" }}>
          <div className="card-body">
            <img
              src={this.state.img}
              className="card-img p-1 rounded mx-auto d-block"
              alt="aligment"
              style={{ maxWidth: "150px" }}
            />
            <br />
            <button
              type="button"
              className="btn btn-block btn-success btn-sm p-1"
              onClick={event => this.onClick(event)}
            >
              Upgrade to premium
            </button>
          </div>
        </div>
      </div>
    );
  }
  async onClick(event) {
    history.push(`/premiumPayment`);
  }
}
