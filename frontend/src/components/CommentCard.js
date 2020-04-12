import React from "react";
import Card from "react-bootstrap/Card";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "วิชานี้สนุกมาก คริคริ",
      rating: 2.5,
      detail:
        "คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ",
      studentName: "Alice"
    };
  }

  render() {
    return (
      <Card className="bg-dark text-white" style={{ width: "25rem" }}>
        <Card.Header>
          <div>{this.state.topic}</div>
        </Card.Header>
        <Card.Body>
          <div className="row ">
            <div className="col-md-4">
              <Rating
                name="half-rating-read"
                defaultValue={this.state.rating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="col-md-8">
              <div class="col-50 text-right"  >{this.state.studentName}</div>
            </div>
          </div>
          <Card.Text>
            <div>{this.state.detail}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default CommentCard;
