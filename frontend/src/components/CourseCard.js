import React from "react";
import "./CourseCard.css";
//import '@fortawesome/fontawesome-free';
class CardHeader extends React.Component {
  render() {
    const { image } = this.props;
    var style = {
      backgroundImage: "url(" + image + ")"
    };
    return React.createElement(
      "header",
      { style: style, id: image, className: "mcard-header" },
      React.createElement(
        "h6",
        { className: "mcard-header--title" },
        "Category"
      )
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
  render() {
    return React.createElement(
      "div",
      { className: "mcard-body" },
      React.createElement("p", { className: "date" }, "20 February 2020"),

      React.createElement("h5", { className: "course-name" }, this.props.title),

      React.createElement("p", { className: "body-content" }, this.props.text),
      <Button type="button" class="btn btn-primary"></Button>
    );
  }
}

class CourseCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courseID: "00001",
      courseName: "EWEf",
      category: "few",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    };
  }
  render() {
    return React.createElement(
      "article",
      { className: "CourseCard" },
      React.createElement(CardHeader, {
        image: "https://source.unsplash.com/user/erondu/600x400"
      }),
      React.createElement(CardBody, {
        title: this.state.courseName,
        text: this.state.description
      })
    );
  }
}

export default CourseCard;
