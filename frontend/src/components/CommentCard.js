import React from "react";
import Card from "react-bootstrap/Card";
import Rating from "@material-ui/lab/Rating";
import "./CommentCard.css";
import Util from "../apis/Util";

class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "วิชานี้สนุกมาก คริคริ",
      rating: 2.5,
      detail:
        "คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ",
      studentName: "Alice",
    };
    this.deleteMyComment = this.deleteMyComment.bind(this);
  }
  async deleteMyComment() {
    let msg = await Util.deleteComment(this.props.data.courseId);
    if (msg.error) {
      window.alert("Error");
    } else {
      window.alert("Your comment is deleted.");
      window.location.reload();
    }
  }
  render() {
    const myId = JSON.parse(localStorage.getItem("user"))._id;
    return (
      <Card
        className="inside-block textnormal CommentCard-card"
        style={{ width: "25rem" }}
      >
        <Card.Header>
          <div style={{ width: "85%", height: "30px" }}>
            <div className="CommentCard-topic">{this.props.data.topic}</div>
          </div>
          {this.props.data.editable && (
            <div style={{ width: "auto" }}>
              <button
                onClick={() => {
                  this.deleteMyComment();
                }}
                className="button-red"
              >
                delete
              </button>
            </div>
          )}
        </Card.Header>
        <Card.Body>
          <div className="row ">
            <div className="col-md-4">
              <Rating
                name="half-rating-read"
                defaultValue={this.props.data.rating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="col-md-8">
              <div className="col-50 text-right">{this.props.data.studentName}</div>
            </div>
          </div>
          <Card.Text className="CommentCard-textDot">
            {this.props.data.text}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="muted">{this.props.data.lastModifiedS}</div>
        </Card.Footer>
      </Card>
    );
  }
}

export default CommentCard;
