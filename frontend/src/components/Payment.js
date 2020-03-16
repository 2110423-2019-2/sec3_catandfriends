import React, { Component } from "react";

export class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgsrc:
        "https://p4.wallpaperbetter.com/wallpaper/780/94/519/animal-baby-dog-fall-wallpaper-2f202d2e4adc1cfb735377924f2c1d43.jpg",
      premium: "การชำระเงินเพื่อเป็นผู้ใช้ระดับพรีเมียม",
      course: "การชำระเงินวิชา ... ",
      price: "จำนวนเงิน 100 บาท"
    };
  }

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
                <div className="bg-warning text-dark">{this.state.premium}</div>
                <div className="bg-danger text-white">{this.state.price}</div>
                <br />
                <br />
                <div>เมื่อชำระเงินสำเร็จ กรุณายืนยันโดยกดส่งสลิปที่นี่</div>
                <div class="container">
                  <label className="bg-success text-white">
                    <input type="file" />
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

export default Payment;
