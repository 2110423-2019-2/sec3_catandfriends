import React from "react";
import "./CourseCard.css";
import history from "./../history";
//import '@fortawesome/fontawesome-free';
class CardHeader extends React.Component {
  render() {
    return (
      <header
        style={{
          backgroundImage: `url(${this.props.imgsrc})`
        }}
        id="image"
        className="mcard-header"
      >
        <h6
          className="mcard-header--title"
          style={{ paddingLeft: "7px", paddingTop: "4px" }}
        >
          {this.props.category}
        </h6>
      </header>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          class="button button-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          <i className="fa fa-chevron-right">Course detail</i>
        </button>
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-body">
                <p>go to course detail.</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CardBody extends React.Component {
  constructor(props) {
    super(props);
    //this.handleOnClick = this.handleOnClick.bind(this);
  }
  render() {
    return (
      <div className="mcard-body">
        <article className="date">{this.props.date}</article>
        <h5 className="course-name">{this.props.title}</h5>
        <p className="body-content">{this.props.text}</p>
        <div style={{ textAlign: "right" }}>{this.props.price}</div>
        <small className="name">{"by " + this.props.tutorname}</small>
      </div>
    );
  }
}

class CourseCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      courseID,
      courseName,
      tutorid,
      description,
      price,
      category,
      day,
      duration
    } = this.props.detail;
    const name = this.props.detail.tutorName;
    const image =
      "https://i.kym-cdn.com/photos/images/newsfeed/001/535/446/1c5.jpg";
    const priceS = this.props.detail.courseFee + ".-";
    const courseid = this.props.detail._id;
    return (
      <article
        className="CourseCard"
        onClick={() => this.onClickGotoCourseInform(courseid)}
      >
        <CardHeader imgsrc={image} category={category}></CardHeader>
        <CardBody
          title={courseName}
          text={description}
          price={priceS}
          date={day}
          tutorname={name}
        ></CardBody>
      </article>
    );
  }
  onClickGotoCourseInform = courseId => {
    history.push(`/course?courseId=${courseId}`);
  };
}

export default CourseCard;
