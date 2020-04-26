import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import Util from "../apis/Util";
export default class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: {
        _id: "",
        topic: "",
        text: "",
        rating: null,
        isCommented: false,
      },
    };
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmitCreate(event) {
    event.preventDefault();
    console.log(this.state.comments);
    if (!this.state.comments.topic || !this.state.comments.text) {
      alert("Please fill every field");
      return;
    } else if (!this.state.comments.rating) {
      alert("Please input rating");
      return;
    }
    let data = await Util.createComment(
      this.props.detail._id,
      this.state.comments.topic,
      this.state.comments.text,
      this.state.comments.rating
    );
    if (data.err) {
      alert(data.err);
    }
    window.location.reload();
  }
  async handleSubmitEdit(event) {
    event.preventDefault();
    console.log(this.state.comments);
    let data = await Util.editComment(
      this.props.detail._id,
      this.state.comments.topic,
      this.state.comments.text,
      this.state.comments.rating
    );
    if (data.err) {
      alert(data.err);
    } else {
      alert("Your comment is edited.");
    }
    window.location.reload();
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div className="bigCard" style={{ minHeight: "200px", height: "auto" }}>
        <form
          onSubmit={(event) => this.handleSubmit(event)}
          style={{ marginLeft: 30 }}
        >
          <div
            className="row textheader justify-content-center"
            style={{ marginBottom: 10 }}
          >
            {this.state.comments.isCommented ? "Edit Review" : "Write Review"}
          </div>
          <div className="row" style={{ marginBottom: 5 }}>
            <div className="col-md-9">
              <div
                className="textheader"
                style={{
                  textAlign: "left",
                  textIndent: "5px",
                  marginBottom: "10px",
                }}
              >
                Topic
              </div>
              <textarea
                type="text"
                className="inbox"
                required="required"
                value={this.state.comments.topic}
                onChange={(event) => {
                  const topic = event.target.value;
                  this.setState((prevState) => {
                    let comments = Object.assign({}, prevState.comments);
                    comments.topic = topic;
                    return { comments };
                  });
                }}
                placeholder="Title"
                style={{ width: "100%", height: "30px", resize: "none" }}
                maxLength="50"
              ></textarea>
            </div>
            <div className="col-md-3">
              <Rating
                name="hover-feedback"
                defalutvalue={this.state.comments.rating}
                value={this.state.comments.rating}
                precision={0.5}
                required
                onChange={(event, newValue) => {
                  this.setState((prevState) => {
                    let comments = Object.assign({}, prevState.comments);
                    comments.rating = newValue;
                    return { comments };
                  });
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              <div
                className="textheader"
                style={{
                  textAlign: "left",
                  textIndent: "5px",
                  marginBottom: "10px",
                }}
              >
                Detail
              </div>
              <textarea
                type="text"
                className="inbox"
                required="required"
                value={this.state.comments.text}
                onChange={(event) => {
                  const text = event.target.value;
                  this.setState((prevState) => {
                    let comments = Object.assign({}, prevState.comments);
                    comments.text = text;
                    return { comments };
                  });
                }}
                placeholder="Comment"
                style={{ width: "100%", height: "150px", resize: "none" }}
                maxLength="150"
              ></textarea>
            </div>
            <div
              className="col-md-3"
              align="center"
              style={{ paddingTop: "15px" }}
            >
              {this.state.comments.isCommented ? (
                <button
                  className="button-white"
                  style={{ width: 100 }}
                  onClick={(event) => {
                    this.handleSubmitEdit(event);
                  }}
                >
                  Edit
                </button>
              ) : (
                <button
                  className="button-white"
                  style={{ width: 100 }}
                  onClick={(event) => {
                    this.handleSubmitCreate(event);
                  }}
                >
                  Comment
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
  async componentDidMount() {
    let comments = await Util.getMyComment(this.props.detail._id);
    this.setState({ comments });
    console.log(this.state.comments);
  }
  // console.log(window.location.search.substring(10));
  // console.log(localStorage.getItem("token"));
  // let data = await Util.getComment(localStorage.getItem("token"),window.location.search.substring(10));
  // this.setState(data);
  // console.log(data)
  // console.log(this.state.comments)
  // }
}
