import React, { Component } from "react";
import Util from "../apis/Util";
import history from "../history";
export default class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: "",
      courseName: "",
      category: "",
      description: "",
      courseFee: "",
      totalAmountOfStudent: "",
      startDate: "",
      endDate: "",
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
      StartTimes: [null, null, null, null, null, null, null],
      EndTimes: [null, null, null, null, null, null, null],
      dayAndStartTime: [null, null, null, null, null, null, null],
      dayAndEndTime: [null, null, null, null, null, null, null],
      day: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // onSubmit={e=>{
  //   alert(JSON.stringify(this.state))
  //   console.log(this.state)
  //   console.log(localStorage.getItem("token"));

  //   e.preventDefault()
  timeToFloat(time) {
    if (!time) return null;
    let a = time.substring(0, 2);
    let b = time.substring(3, 5);
    let c = a + b;
    let d = parseInt(c) / 100;
    return d;
  }

  floatToTime(float) {
    if (!float) return null;
    let a = float.toString();
    let b = (float * 100).toString();
    let [hour, minute] = a.split(".");
    minute = hour <= 9 ? b.substring(1, 3) : b.substring(2, 4);
    return (hour <= 9 ? "0" + hour : hour) + ":" + minute;
  }

  dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  }

  setObject() {
    if (this.state.dayAndStartTime[0] != null) {
      this.state.Monday = true;
      document.getElementById("Monday").checked = true;
    }
    if (this.state.dayAndStartTime[1] != null) {
      this.state.Tuesday = true;
      document.getElementById("Tuesday").checked = true;
    }
    if (this.state.dayAndStartTime[2] != null) {
      this.state.Wednesday = true;
      document.getElementById("Wednesday").checked = true;
    }
    if (this.state.dayAndStartTime[3] != null) {
      this.state.Thursday = true;
      document.getElementById("Thursday").checked = true;
    }
    if (this.state.dayAndStartTime[4] != null) {
      this.state.Friday = true;
      document.getElementById("Friday").checked = true;
    }
    if (this.state.dayAndStartTime[5] != null) {
      this.state.Saturday = true;
      document.getElementById("Saturday").checked = true;
    }
    if (this.state.dayAndStartTime[6] != null) {
      this.state.Sunday = true;
      document.getElementById("Sunday").checked = true;
    }
    this.enableTime();
    var i = 0;
    for (i = 0; i < 7; i++) {
      var ST = this.state.dayAndStartTime[i];
      var ET = this.state.dayAndEndTime[i];
      if (ST == null) document.getElementById("ST" + i).value = null;
      if (ST != null)
        document.getElementById("ST" + i).value = this.floatToTime(ST);
      if (ET == null) document.getElementById("ET" + i).value = null;
      if (ET != null)
        document.getElementById("ET" + i).value = this.floatToTime(ET);
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
      // dayAndStartTime:[this.timeToFloat(this.state.ST0),this.timeToFloat(this.state.ST1),this.timeToFloat(this.state.ST2),this.timeToFloat(this.state.ST3),this.timeToFloat(this.state.ST4),this.timeToFloat(this.state.ST5),this.timeToFloat(this.state.ST6)],
      // dayAndEndTime:[this.timeToFloat(this.state.ET0),this.timeToFloat(this.state.ET1),this.timeToFloat(this.state.ET2),this.timeToFloat(this.state.ET3),this.timeToFloat(this.state.ET4),this.timeToFloat(this.state.ET5),this.timeToFloat(this.state.ET6)],
    });
    this.enableTime();
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.compareDate()) {
      alert("Start Date must be before End Date");
    } else {
      alert(JSON.stringify(this.state));
      let data = await Util.editCourse(
        this.state._id,
        this.state.courseName,
        this.state.dayAndStartTime,
        this.state.dayAndEndTime,
        this.state.startDate,
        this.state.endDate,
        localStorage.getItem("token"),
        this.state.totalAmountOfStudent,
        this.state.description,
        this.state.price,
        this.state.category
      );
      //let data = await Util.createCourse("ff",[6.3,null,null,null,null,null,null],[8.3,null,null,null,null,null,null],this.state.startDate,this.state.endDate,localStorage.getItem("token"),13,"dfsdfsdf",11111,"language");
      console.log(data);
    }
  }

  handleDayAndStartTimeChange = () => {
    var newArray = new Array();
    var j = 0;
    for (j = 0; j < 7; j++) {
      var InputValue = document.getElementById("ST" + j).value;
      if (InputValue == "") {
        newArray.push(null);
      } else {
        newArray.push(this.timeToFloat(InputValue));
      }
    }
    this.setState({
      dayAndStartTime: newArray
    });
  };

  handleDayAndEndTimeChange = () => {
    var newArray = new Array();
    var j = 0;
    for (j = 0; j < 7; j++) {
      var InputValue = document.getElementById("ET" + j).value;
      if (InputValue == "") {
        newArray.push(null);
      } else {
        newArray.push(this.timeToFloat(InputValue));
      }
    }
    this.setState({
      dayAndEndTime: newArray
    });
  };
  // hanndleCancel(event){

  // }

  enableTime() {
    var Mon = document.getElementById("Monday").checked;
    var Tue = document.getElementById("Tuesday").checked;
    var Wed = document.getElementById("Wednesday").checked;
    var Thu = document.getElementById("Thursday").checked;
    var Fri = document.getElementById("Friday").checked;
    var Sat = document.getElementById("Saturday").checked;
    var Sun = document.getElementById("Sunday").checked;

    document.getElementById("ST0").disabled = !Mon;
    document.getElementById("ET0").disabled = !Mon;
    document.getElementById("ST0").required = Mon;
    document.getElementById("ET0").required = Mon;

    if (!Mon) {
      document.getElementById("ST0").value = null;
      document.getElementById("ET0").value = null;
    }

    document.getElementById("ST1").disabled = !Tue;
    document.getElementById("ET1").disabled = !Tue;
    document.getElementById("ST1").required = Tue;
    document.getElementById("ET1").required = Tue;
    if (!Tue) {
      document.getElementById("ST1").value = null;
      document.getElementById("ET1").value = null;
    }

    document.getElementById("ST2").disabled = !Wed;
    document.getElementById("ET2").disabled = !Wed;
    document.getElementById("ST2").required = Wed;
    document.getElementById("ET2").required = Wed;
    if (!Wed) {
      document.getElementById("ST2").value = null;
      document.getElementById("ET2").value = null;
    }

    document.getElementById("ST3").disabled = !Thu;
    document.getElementById("ET3").disabled = !Thu;
    document.getElementById("ST3").required = Thu;
    document.getElementById("ET3").required = Thu;
    if (!Thu) {
      document.getElementById("ST3").value = null;
      document.getElementById("ET3").value = null;
    }

    document.getElementById("ST4").disabled = !Fri;
    document.getElementById("ET4").disabled = !Fri;
    document.getElementById("ST4").required = Fri;
    document.getElementById("ET4").required = Fri;
    if (!Fri) {
      document.getElementById("ST4").value = null;
      document.getElementById("ET4").value = null;
    }

    document.getElementById("ST5").disabled = !Sat;
    document.getElementById("ET5").disabled = !Sat;
    document.getElementById("ST5").required = Sat;
    document.getElementById("ET5").required = Sat;
    if (!Sat) {
      document.getElementById("ST5").value = null;
      document.getElementById("ET5").value = null;
    }

    document.getElementById("ST6").disabled = !Sun;
    document.getElementById("ET6").disabled = !Sun;
    document.getElementById("ST6").required = Sun;
    document.getElementById("ET6").required = Sun;
    if (!Sun) {
      document.getElementById("ST6").value = null;
      document.getElementById("ET6").value = null;
    }

    document.getElementById("Monday").required = !(
      Mon ||
      Tue ||
      Wed ||
      Thu ||
      Fri ||
      Sat ||
      Sun
    );
  }

  render() {
    return (
      <div className="card mb-4 p-3" style={{ maxWidth: 1000 }}>
        <h3 className="card-title border text-center">Edit Course</h3>
        <br />
        <form
          onSubmit={event => this.handleSubmit(event)}
          style={{ marginLeft: 30 }}
        >
          <div class="row">
            <div class="col-md-6" width="100%">
              <label>
                Course Name
                <br />
                <input
                  type="text"
                  required
                  value={this.state.courseName}
                  name="courseName"
                  onChange={this.handleChange}
                  style={{ width: 262 }}
                />
              </label>
            </div>
            <div class="col-md-6">
              <label>
                Category
                <br />
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={this.state.category}
                  required
                >
                  <option value="Language">Language</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Social">Social</option>
                </select>
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3" width="100%">
              <label>
                Start Date
                <br />
                <input
                  type="Date"
                  required
                  value={this.state.startDate}
                  onChange={this.handleChange}
                  name="startDate"
                  id="startDate"
                />
              </label>
            </div>
            <div class="col-md-3" width="100%">
              <label>
                End Date
                <br />
                <input
                  type="Date"
                  required
                  value={this.state.endDate}
                  onChange={this.handleChange}
                  name="endDate"
                  id="endDate"
                />
              </label>
            </div>
            <div class="col-md-3" width="100%">
              <label>
                Price
                <br />
                <input
                  type="Number"
                  min="0"
                  required
                  value={this.state.courseFee}
                  onChange={this.handleChange}
                  name="courseFee"
                />
              </label>
            </div>
            <div class="col-md-3" width="100%">
              <label>
                Student amount
                <br />
                <input
                  type="Number"
                  min="0"
                  required
                  value={this.state.totalAmountOfStudent}
                  onChange={this.handleChange}
                  name="totalAmountOfStudent"
                />
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3" width="100%">
              <label htmlFor="Weekday">
                Week day
                <div id="Weekday" style={{ paddingTop: "5px" }}>
                  <input
                    required
                    type="checkbox"
                    name="Monday"
                    id="Monday"
                    value={this.Monday}
                    onChange={this.handleChange}
                  />
                  <label
                    htmlFor="Monday"
                    style={{ marginLeft: "10px", paddingTop: "2px" }}
                  >
                    Monday
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    name="Tuesday"
                    id="Tuesday"
                    value={this.Tuesday}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="Tuesday" style={{ marginLeft: "10px" }}>
                    Tuesday
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    name="Wednesday"
                    id="Wednesday"
                    value={this.Wednesday}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="Wednesday" style={{ marginLeft: "10px" }}>
                    Wednesday
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    name="Thursday"
                    id="Thursday"
                    value={this.Thursday}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="Thursday" style={{ marginLeft: "10px" }}>
                    Thursday
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    name="Friday"
                    id="Friday"
                    value={this.Friday}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="Friday" style={{ marginLeft: "10px" }}>
                    Friday
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    name="Saturday"
                    id="Saturday"
                    value={this.Saturday}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="Saturday" style={{ marginLeft: "10px" }}>
                    Saturday
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    name="Sunday"
                    id="Sunday"
                    value={this.Sunday}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="Sunday" style={{ marginLeft: "10px" }}>
                    Sunday
                  </label>
                  <br />
                </div>
              </label>
            </div>
            <div class="col-md-3" width="100%">
              <label htmlFor="StartTime">Start Time</label>
              <div id="StartTime">
                <input
                  type="Time"
                  name="ST0"
                  id="ST0"
                  min="06:00"
                  max="22:00"
                  value={this.state.StartTimes[0]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndStartTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST1"
                  id="ST1"
                  min="06:00"
                  max="22:00"
                  value={this.state.StartTimes[1]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndStartTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST2"
                  id="ST2"
                  min="06:00"
                  max="22:00"
                  value={this.state.StartTimes[2]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndStartTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST3"
                  id="ST3"
                  min="06:00"
                  max="22:00"
                  value={this.state.StartTimes[3]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndStartTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST4"
                  id="ST4"
                  min="06:00"
                  max="22:00"
                  value={this.state.StartTimes[4]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndStartTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST5"
                  id="ST5"
                  min="06:00"
                  max="22:00"
                  value={this.state.StartTimes[5]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndStartTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST6"
                  id="ST6"
                  min="06:00"
                  max="22:00"
                  value={this.state.StartTimes[6]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndStartTimeChange}
                  disabled
                />
                <br />
              </div>
            </div>

            <div class="col-md-3" width="100%">
              <label htmlFor="EndTime">End Time</label>
              <div id="EndTime">
                <input
                  type="Time"
                  name="ET0"
                  id="ET0"
                  min="06:00"
                  max="22:00"
                  value={this.state.EndTimes[0]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndEndTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET1"
                  id="ET1"
                  min="06:00"
                  max="22:00"
                  value={this.state.EndTimes[1]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndEndTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET2"
                  id="ET2"
                  min="06:00"
                  max="22:00"
                  value={this.state.EndTimes[2]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndEndTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET3"
                  id="ET3"
                  min="06:00"
                  max="22:00"
                  value={this.state.EndTimes[3]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndEndTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET4"
                  id="ET4"
                  min="06:00"
                  max="22:00"
                  value={this.state.EndTimes[4]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndEndTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET5"
                  id="ET5"
                  min="06:00"
                  max="22:00"
                  value={this.state.EndTimes[5]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndEndTimeChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET6"
                  id="ET6"
                  min="06:00"
                  max="22:00"
                  value={this.state.EndTimes[6]}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleDayAndEndTimeChange}
                  disabled
                />
                <br />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6" width="100%" height="100px">
              <label>
                Description
                <br />
                <textarea
                  type="text"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                  style={{ width: 900, height: 200, resize: "none" }}
                  name="description"
                />
              </label>
            </div>
          </div>

          <br />
          <div className="text-center" style={{ marginRight: 40 }}>
            <input
              type="submit"
              value="Submit"
              className="btn btn-success"
              style={{ marginRight: 20 }}
            />
            {/* <input type="cancel" value="Cancel" className="btn btn-danger" style={{width:76.5, height:38}}/> */}
          </div>
        </form>
      </div>
    );
  }

  async componentDidMount() {
    console.log(window.location.search);
    let data = await Util.getCourseById(window.location.search.substring(10));
    let startDate = new Date(data.startDate);
    startDate = this.dateToYMD(startDate);
    let endDate = new Date(data.endDate);
    endDate = this.dateToYMD(endDate);
    this.setState(data);
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
    this.setObject();
  }
}
