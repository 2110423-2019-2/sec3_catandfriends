import React, { Component } from "react";
import Filter from "../components/Filter";
import CourseCardLayout from "../components/CourseCardLayout";
import Util from "../apis/Util";

function CheckboxTemplate(props) {
  return (
    <div>
      <input
        id={props.id}
        type="checkbox"
        checked={props.state}
        onChange={props.handler}
      />
      <label htmlFor={props.id}>{props.text}</label>
    </div>
  );
}

function DayGroup(props) {
  return (
    <ul className="border" style={{ textAlign: "left" }}>
      <h4 style={{ textAlign: "left" }}>Day</h4>
      <CheckboxTemplate
        text="Sunday"
        id="sunday"
        state={props.state.sunday}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="Monday"
        id="monday"
        state={props.state.monday}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="Tuesday"
        id="tuesday"
        state={props.state.tuesday}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="Wednesday"
        id="wednesday"
        state={props.state.wednesday}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="Thursday"
        id="thursday"
        state={props.state.thursday}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="Friday"
        id="friday"
        state={props.state.friday}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="Saturday"
        id="saturday"
        state={props.state.saturday}
        handler={props.handler}
      />
    </ul>
  );
}

function SubjectGroup(props) {
  return (
    <ul className="border" style={{ textAlign: "left" }}>
      <h4 style={{ textAlign: "left" }}>Subject</h4>
      <CheckboxTemplate
        text="Mathematics"
        id="mathematics"
        state={props.state.mathematics}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="Science"
        id="science"
        state={props.state.science}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="Social"
        id="social"
        state={props.state.social}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="Language"
        id="language"
        state={props.state.language}
        handler={props.handler}
      />
    </ul>
  );
}

function TimeGroup(props) {
  return (
    <ul className="border" style={{ textAlign: "left" }}>
      <h4 style={{ textAlign: "left" }}>Time</h4>
      <CheckboxTemplate
        text="6:00 to 8:00"
        id="time6To8"
        state={props.state.time6To8}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="8:00 to 10:00"
        id="time8To10"
        state={props.state.time8To10}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="10:00 to 12:00"
        id="time10To12"
        state={props.state.time10To12}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="12:00 to 14:00"
        id="time12To14"
        state={props.state.time12To14}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="14:00 to 16:00"
        id="time14To16"
        state={props.state.time14To16}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="16:00 to 18:00"
        id="time16To18"
        state={props.state.time16To18}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="18:00 to 20:00"
        id="time18To20"
        state={props.state.time18To20}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="20:00 to 22:00"
        id="time20To22"
        state={props.state.time20To22}
        handler={props.handler}
      />
    </ul>
  );
}

function PriceGroup(props) {
  return (
    <ul className="border" style={{ textAlign: "left" }}>
      <h4 style={{ textAlign: "left" }}>Price</h4>
      <CheckboxTemplate
        text="0 - 500 Baht"
        id="price0To500"
        state={props.state.price0To500}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="500 - 1500 Baht"
        id="price500To1500"
        state={props.state.price500To1500}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="1500 - 3500 Baht"
        id="price1500To3500"
        state={props.state.price1500To3500}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="3500 - 6500 Baht"
        id="price3500To6500"
        state={props.state.price3500To6500}
        handler={props.handler}
      />
      <CheckboxTemplate
        text="6500 Baht up"
        id="price6500AndAbove"
        state={props.state.price6500AndAbove}
        handler={props.handler}
      />
    </ul>
  );
}

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      },
      dayStr: "0000000",
      subject: {
        mathematics: false,
        science: false,
        social: false,
        language: false
      },
      subStr: "0000",
      time: {
        time6To8: false,
        time8To10: false,
        time10To12: false,
        time12To14: false,
        time14To16: false,
        time16To18: false,
        time18To20: false,
        time20To22: false
      },
      timeStr: "00000000",
      price: {
        price0To500: false,
        price500To1500: false,
        price1500To3500: false,
        price3500To6500: false,
        price6500AndAbove: false
      },
      priceStr: "00000",
      data: {
        courseID: "1989",
        courseName: "a",
        image: "https://source.unsplash.com/user/erondu/600x400",
        category: "few",
        description: "this is it",
        price: "4500",
        date: "Mondays 8.00-10.00"
      }
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleDayChange(event) {
    let temp = this.state;
    temp.day[event.target.id] = event.target.checked;
    this.setState(temp);
  }
  handleSubjectChange(event) {
    let temp = this.state;
    temp.subject[event.target.id] = event.target.checked;
    this.setState(temp);
  }
  handleTimeChange(event) {
    let temp = this.state;
    temp.time[event.target.id] = event.target.checked;
    this.setState(temp);
  }
  handlePriceChange(event) {
    let temp = this.state;
    temp.price[event.target.id] = event.target.checked;
    this.setState(temp);
  }
  getDay() {
    return (
      (this.state.day.monday | 0) +
      "" +
      ((this.state.day.tuesday | 0) + "") +
      ((this.state.day.wednesday | 0) + "") +
      ((this.state.day.thursday | 0) + "") +
      ((this.state.day.friday | 0) + "") +
      ((this.state.day.saturday | 0) + "") +
      ((this.state.day.sunday | 0) + "")
    );
  }
  getPrice() {
    return (
      (this.state.price.price0To500 | 0) +
      "" +
      ((this.state.price.price500To1500 | 0) + "") +
      ((this.state.price.price1500To3500 | 0) + "") +
      ((this.state.price.price3500To6500 | 0) + "") +
      ((this.state.price.price6500AndAbove | 0) + "")
    );
  }
  getSub() {
    return (
      (this.state.subject.mathematics | 0) +
      "" +
      ((this.state.subject.science | 0) + "") +
      ((this.state.subject.social | 0) + "") +
      ((this.state.subject.language | 0) + "")
    );
  }
  getTime() {
    return (
      (this.state.time.time6To8 | 0) +
      "" +
      ((this.state.time.time8To10 | 0) + "") +
      ((this.state.time.time10To12 | 0) + "") +
      ((this.state.time.time12To14 | 0) + "") +
      ((this.state.time.time14To16 | 0) + "") +
      ((this.state.time.time16To18 | 0) + "") +
      ((this.state.time.time18To20 | 0) + "") +
      ((this.state.time.time20To22 | 0) + "")
    );
  }
  handleSubmit = async event => {
    event.preventDefault();
    let a = this.getDay();
    let b = this.getSub();
    let c = this.getTime();
    let d = this.getPrice();
    await this.setState({ dayStr: a, subStr: b, timeStr: c, priceStr: d });
    console.log(a, b, c, d);
    console.log(JSON.stringify(this.state));
    let data = await Util.getSearchResult(
      this.state.dayStr,
      this.state.subStr,
      this.state.timeStr,
      this.state.priceStr
    );
    this.setState({ data });
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <div className="card border" style={{ maxWidth: 250 }}>
              <div className="card-body">
                <form
                  onSubmit={this.handleSubmit}
                  style={{ textAlign: "center" }}
                >
                  <DayGroup
                    state={this.state.day}
                    handler={this.handleDayChange}
                  />
                  <SubjectGroup
                    state={this.state.subject}
                    handler={this.handleSubjectChange}
                  />
                  <TimeGroup
                    state={this.state.time}
                    handler={this.handleTimeChange}
                  />
                  <PriceGroup
                    state={this.state.price}
                    handler={this.handlePriceChange}
                  />
                  <input
                    className="btn btn-success"
                    type="submit"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <CourseCardLayout data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }

  getFilter = () =>{
    let day = "";
    let subject = "";
    let time = "";
    let price = "";
    return
  }
  async componentDidMount() {
    console.log(window.location.search);
    let data = await Util.getSearchResult(window.location.search);
    await this.setState({ data });
    await console.log(data);
  }
}
