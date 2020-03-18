import React, { Component } from "react";
import axios from "axios";

export default class PaymentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img:
        "https://lh3.googleusercontent.com/proxy/h80wlQeyZcLvQkg4cdNKx68BMWbsQbG_gUF42Kvn55ELwaPB6FMgBtPYxzMv7uvMx41NAPdO8BAOpYjASnaPmrxEtGESJrOOw-juz72UXkfP8eCakZLYjtJxXJc4P-JZ"
    };
  }

  render() {
    return (
      <div className="vc">
        <div className="card" style={{ width: "16rem" }}>
          <div className="card-body">
            <img
              src={this.state.img}
              className="card-img p-1 rounded mx-auto d-block" alt="aligment"
              style={{ maxWidth: "150px" }}
            />
            <br />
            <button
              type="button"
              className="btn btn-block btn-success btn-sm p-1"
            >
              Upgrade to premium
            </button>
          </div>
        </div>
      </div>
    );
  }
}
