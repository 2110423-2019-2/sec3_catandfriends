import React from "react";
import "./CourseCard.css";
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
  }
  render() {
    return (
      <div className="mcard-body">
        <p className="date">{this.props.date}</p>
        <h5 className="course-name">{this.props.title}</h5>
        <p className="body-content">{this.props.text}</p>
        <body style={{ textAlign: "right" }}>{this.props.price + ".-"}</body>
        <body>
          <Button type="button" class="btn btn-primary"></Button>
        </body>
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
      image,
      category,
      description,
      price,
      date
    } = this.props.detail;
    return (
      <article className="CourseCard">
        <CardHeader imgsrc={image} category={category}></CardHeader>
        <CardBody
          title={courseName}
          text={description}
          price={price}
          date={date}
        ></CardBody>
      </article>
    );
  }
}

export default CourseCard;
