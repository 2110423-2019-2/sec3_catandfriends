import React from "react";
import "./CourseCard.css";
//import '@fortawesome/fontawesome-free';
class CardHeader extends React.Component {
  render() {
    const { image } = this.props;
    var style = {
      backgroundImage: "url(" + image + ")"
    };
    return (
      <header style={style} id="image" className="mcard-header">
        <h6 className="mcard-header--title">Subject</h6>
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
        <p className="date">20 February 2020</p>
        <h5 className="course-name">{this.props.title}</h5>
        <p className="body-content">{this.props.text}</p>
        <Button type="button" class="btn btn-primary"></Button>
      </div>
    );
  }
}

class CourseCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courseID: "00001",
      courseName: "EWEf",
      image: "https://source.unsplash.com/user/erondu/600x400",
      category: "few",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    };
  }
  render() {
    return (
      <article className="CourseCard">
        <CardHeader image={this.state.image}></CardHeader>
        <CardBody
          title={this.state.courseName}
          text={this.state.description}
        ></CardBody>
      </article>
    );
  }
}

export default CourseCard;
