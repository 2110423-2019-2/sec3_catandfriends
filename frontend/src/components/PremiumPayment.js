import React, { Component } from "react";
import axios from "axios";

export class PremiumPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://p4.wallpaperbetter.com/wallpaper/780/94/519/animal-baby-dog-fall-wallpaper-2f202d2e4adc1cfb735377924f2c1d43.jpg"
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
      <div className="card mb-3" style={{ maxWidth: "1000px" }}>
        <div className="row no-gutters">
          <div className="card-body">
            <div className="row border text-center">
              <div className="col-md-12 border text-center bg-dark text-white ">
                <br />
                <h3 className="card-title">ช่องทางการชำระเงิน</h3>
                <br />
              </div>

              <div className="col-md-8 border bg-light text-dark">
                <br />
                <div className="bg-warning text-dark">การชำระเงินเพื่อเป็นผู้ใช้ระดับพรีเมียม</div>
                <div className="bg-danger text-white">จำนวนเงิน 350 บาท</div>
                <br />
                <br />
                <div>เมื่อชำระเงินสำเร็จ กรุณายืนยันโดยกดส่งสลิปที่นี่</div>
                <div class="container">
                  <label /*className="bg-success text-white"*/>
                    <input
                      id="bill"
                      className="bg-primary text-white"
                      //className="form-control-file p-1"
                      type="file"
                      name="file"
                      onChange={this.onChangeHandler}
                    />
                    <button
                      type="button"
                      className="btn btn-block btn btn-outline-success btn-sm p-1"
                      onClick={this.onClickHandler}
                    >
                      send
                    </button>
                  </label>
                </div>
                <br />
                <br />
                <br />
                <div>* กรุณารอการยืนยัน 2-3 วันทำการ *</div>
                <div>ขอบคุณค่ะ</div>
              </div>
              <div className="col-md-4 border bg-secondary text-white">
                <br />
                <p>สแกน QR Code ที่นี่</p>
                <img
                  src={this.state.imgsrc}
                  className="card-img p-3"
                  style={{ maxWidth: "300px" }}
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PremiumPayment;
