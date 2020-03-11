import React from "react";
import history from "./../history";
import "./CourseCard.css";
import "./EditableCard.css";

class EditBtn extends React.Component {
  render() {
    return (
      <button
        class="button button-secondary"
        // data-toggle="modal"
        // data-target="#editModal"
        onclick={() => {
          console.log("click");
        }}
      >
        <i className="fa fa-edit"> edit</i>
      </button>
    );
  }
}

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
        <button
          class="button button-secondary"
          onClick={() => {
            history.push(`/course/edit?courseId=${this.props.courseid}`);
          }}
        >
          <i className="fa fa-edit"> edit</i>
        </button>
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
      <div
        className="mcard-body"
        onClick={() => this.onClickGotoCourseInform(this.props.courseid)}
      >
        <article className="date">{this.props.date}</article>
        <h5 className="course-name">{this.props.title}</h5>
        <p className="body-content">{this.props.text}</p>
        <div class="row">
          <div
            class={
              this.props.available
                ? "col-md-6 amount notfull"
                : "col-md-6 amount full"
            }
          >
            <div>{this.props.remain + "/" + this.props.total}</div>
          </div>
          <div class="col-md-6 price">
            <div>{this.props.price}</div>
          </div>
        </div>
      </div>
    );
  }
  onClickGotoCourseInform = courseId => {
    history.push(`/course?courseId=${courseId}`);
  };
}

class EditableCard extends React.Component {
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
    // console.log(this.props.detail);
    const name = this.props.detail.tutorName
      ? "by " + this.props.detail.tutorName
      : "";
    const image =
      "https://i.kym-cdn.com/photos/images/newsfeed/001/535/446/1c5.jpg";
    const priceS = this.props.detail.courseFee + ".-";
    const courseid = this.props.detail._id;
    return (
      <article className="CourseCard">
        <CardHeader
          courseid={courseid}
          imgsrc={image}
          category={category}
        ></CardHeader>
        <CardBody
          courseid={courseid}
          title={courseName}
          text={description}
          price={priceS}
          date={day}
          tutorname={name}
          remain={this.props.detail.amountOfStudent}
          total={this.props.detail.totalAmountOfStudent}
          available={this.props.detail.isAvailable}
        ></CardBody>
      </article>
    );
  }
  onClickGotoCourseInform = courseId => {
    history.push(`/course?courseId=${courseId}`);
  };
}
//ll

export default EditableCard;
