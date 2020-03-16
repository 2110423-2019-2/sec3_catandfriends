import React, { Component } from "react";
import Util from "../apis/Util";
import history from "../history";
export default class NewCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: "",
      courseName: "",
      category: "Language",
      description: "",
      courseFee: "",
      totalAm0ountOfStudent: "",
      startDate: "",
      endDate: "",
      Monday: false,
      ST0: null,
      ET0: null,
      Tuesday: false,
      ST1: null,
      ET1: null,
      Wednesday: false,
      ST2: null,
      ET2: null,
      Thursday: false,
      ST3: null,
      ET3: null,
      Friday: false,
      ST4: null,
      ET4: null,
      Saturday: false,
      ST5: null,
      ET5: null,
      Sunday: false,
      ST6: null,
      ET6: null,
      dayAndStartTime: [null, null, null, null, null, null, null],
      dayAndEndTime: [null, null, null, null, null, null, null]
    };

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
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      dayAndStartTime: [
        this.timeToFloat(this.state.ST0),
        this.timeToFloat(this.state.ST1),
        this.timeToFloat(this.state.ST2),
        this.timeToFloat(this.state.ST3),
        this.timeToFloat(this.state.ST4),
        this.timeToFloat(this.state.ST5),
        this.timeToFloat(this.state.ST6)
      ],
      dayAndEndTime: [
        this.timeToFloat(this.state.ET0),
        this.timeToFloat(this.state.ET1),
        this.timeToFloat(this.state.ET2),
        this.timeToFloat(this.state.ET3),
        this.timeToFloat(this.state.ET4),
        this.timeToFloat(this.state.ET5),
        this.timeToFloat(this.state.ET6)
      ]
    });
    this.enableTime();
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.compareDate()) {
      alert("Start Date must be before End Date");
    } else {
      let data = await Util.createCourse(
        this.state.courseName,
        this.state.dayAndStartTime,
        this.state.dayAndEndTime,
        this.state.startDate,
        this.state.endDate,
        localStorage.getItem("token"),
        this.state.totalAmountOfStudent,
        this.state.description,
        this.state.courseFee,
        this.state.category
      );
      //let data = await Util.createCourse("ff",[6.3,null,null,null,null,null,null],[8.3,null,null,null,null,null,null],this.state.startDate,this.state.endDate,localStorage.getItem("token"),13,"dfsdfsdf",11111,"language");
      if (!data.error) {
        alert("New course created");
        history.push("/profile");
      } else {
        window.alert("Cannot Create Course");
      }
      console.log(data);
    }
  }

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
      this.setState({
        ST0: null,
        ET0: null
      });
    }

    document.getElementById("ST1").disabled = !Tue;
    document.getElementById("ET1").disabled = !Tue;
    document.getElementById("ST1").required = Tue;
    document.getElementById("ET1").required = Tue;
    if (!Tue) {
      document.getElementById("ST1").value = null;
      document.getElementById("ET1").value = null;
      this.setState({
        ST1: null,
        ET1: null
      });
    }

    document.getElementById("ST2").disabled = !Wed;
    document.getElementById("ET2").disabled = !Wed;
    document.getElementById("ST2").required = Wed;
    document.getElementById("ET2").required = Wed;
    if (!Wed) {
      document.getElementById("ST2").value = null;
      document.getElementById("ET2").value = null;
      this.setState({
        ST2: null,
        ET2: null
      });
    }

    document.getElementById("ST3").disabled = !Thu;
    document.getElementById("ET3").disabled = !Thu;
    document.getElementById("ST3").required = Thu;
    document.getElementById("ET3").required = Thu;
    if (!Thu) {
      document.getElementById("ST3").value = null;
      document.getElementById("ET3").value = null;
      this.setState({
        ST3: null,
        ET3: null
      });
    }

    document.getElementById("ST4").disabled = !Fri;
    document.getElementById("ET4").disabled = !Fri;
    document.getElementById("ST4").required = Fri;
    document.getElementById("ET4").required = Fri;
    if (!Fri) {
      document.getElementById("ST4").value = null;
      document.getElementById("ET4").value = null;
      this.setState({
        ST4: null,
        ET4: null
      });
    }

    document.getElementById("ST5").disabled = !Sat;
    document.getElementById("ET5").disabled = !Sat;
    document.getElementById("ST5").required = Sat;
    document.getElementById("ET5").required = Sat;
    if (!Sat) {
      document.getElementById("ST5").value = null;
      document.getElementById("ET5").value = null;
      this.setState({
        ST5: null,
        ET5: null
      });
    }

    document.getElementById("ST6").disabled = !Sun;
    document.getElementById("ET6").disabled = !Sun;
    document.getElementById("ST6").required = Sun;
    document.getElementById("ET6").required = Sun;
    if (!Sun) {
      document.getElementById("ST6").value = null;
      document.getElementById("ET6").value = null;
      this.setState({
        ST6: null,
        ET6: null
      });
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

  compareDate() {
    var a = document.getElementById("startDate").value;
    var b = document.getElementById("endDate").value;
    var splitA = a.split("/");
    var splitB = b.split("/");
    var aDate = Date.parse(splitA[0], splitA[1] - 1, splitA[2]);
    var bDate = Date.parse(splitB[0], splitB[1] - 1, splitB[2]);
    return aDate < bDate;
  }

  render() {
    return (
      <div className="card mb-4 p-3" style={{ maxWidth: 1000 }}>
        <h3 className="card-title border text-center">New Course</h3>
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
                <select name="category" onChange={this.handleChange} required>
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
                  value={this.ST0}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST1"
                  id="ST1"
                  min="06:00"
                  max="22:00"
                  value={this.ST1}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST2"
                  id="ST2"
                  min="06:00"
                  max="22:00"
                  value={this.ST2}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST3"
                  id="ST3"
                  min="06:00"
                  max="22:00"
                  value={this.ST3}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST4"
                  id="ST4"
                  min="06:00"
                  max="22:00"
                  value={this.ST4}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST5"
                  id="ST5"
                  min="06:00"
                  max="22:00"
                  value={this.ST5}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ST6"
                  id="ST6"
                  min="06:00"
                  max="22:00"
                  value={this.ST6}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
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
                  value={this.ET0}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET1"
                  id="ET1"
                  min="06:00"
                  max="22:00"
                  value={this.ET1}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET2"
                  id="ET2"
                  min="06:00"
                  max="22:00"
                  value={this.ET2}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET3"
                  id="ET3"
                  min="06:00"
                  max="22:00"
                  value={this.ET3}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET4"
                  id="ET4"
                  min="06:00"
                  max="22:00"
                  value={this.ET4}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET5"
                  id="ET5"
                  min="06:00"
                  max="22:00"
                  value={this.ET5}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
                  disabled
                />
                <br />
                <input
                  type="Time"
                  name="ET6"
                  id="ET6"
                  min="06:00"
                  max="22:00"
                  value={this.ET6}
                  style={{ marginBottom: "2px" }}
                  onChange={this.handleChange}
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
}
