import React, { Component } from "react";
import "./CommentCardLayout.css";
import CommentCard from "./CommentCard";
import Util from "../apis/Util";

export default class CommentCardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: [
        {
          topic: "A",
          rating: 2.5,
          text:
            "คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ",
          studentName: "Alice",
          studentId: "5e873efc43b0911cb2d5cc60",
          lastModified: "12 Jan",
          editable: true,
        },
        {
          topic: "B",
          rating: 3.5,
          text:
            "คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ",
          studentId: "5e873efc43b0911cb2d5dscc60",
          lastModified: "12 Jan",
          editable: false,
        },
        {
          topic: "C",
          rating: 3.0,
          text:
            "คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ",
          studentId: "5e873efc43dfdb0911cb2d5cc60",
          lastModified: "12 Jan",
          editable: false,
        },
        {
          topic: "D",
          rating: 4.0,
          text:
            "คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ",
          studentId: "5e873efsdsc43b0911cb2d5cc60",
          lastModified: "12 Jan",
          editable: false,
        },
        {
          topic: "E",
          rating: 4.5,
          text:
            "คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ คนสอนสอนดีมากก สอนดีกว่าอาจารย์สอนที่โรงเรียนอีก แถมยังหล่ออีกต่างหาก โฮ้ๆๆๆๆๆ",
          studentName: "Alex",
          studentId: "5e873edsssfc43b0911cb2d5cc60",
          lastModified: "12 Jan",
          editable: false,
        },
      ],
    };
  }
  // {this.state.data.map(item => (
  //   <CourseCard detail={item} key={item._id.toString()} />
  // ))}
  getIndicator() {
    let n = (this.state.comments.length + 1) / 2;
    let items = [];
    let i = 1;
    if (n <= 1) {
      return;
    } else {
      for (i = 2; i < n; i++) {
        items.push(
          <li
            data-target="#carouselExampleIndicators"
            key={i}
            data-slide-to={i}
          ></li>
        );
      }
      return items;
    }
  }
  getComment() {
    let n = this.state.comments.length;
    let items = [];
    let i = 2;
    if (n >= 0) {
      items = [
        <div class="carousel-item active">
          <div className="row justify-content-center">
            <CommentCard
              data={{
                topic: "No comment",
                rating: 0.0,
                text: "There is no comment for this course.",
                studentId: "",
                lastModified: "",
                editable: false,
              }}
            />
          </div>
        </div>,
      ];
    }
    if (n >= 1) {
      items = [
        <div class="carousel-item active">
          <div className="row justify-content-center">
            <CommentCard
              data={this.state.comments[0]}
              key={this.state.comments[0]._id}
            />
          </div>
        </div>,
      ];
    }
    if (n >= 2) {
      items = [
        <div class="carousel-item active">
          <div className="row justify-content-center">
            <CommentCard
              data={this.state.comments[0]}
              key={this.state.comments[0]._id}
            />
            <CommentCard
              data={this.state.comments[1]}
              key={this.state.comments[1]._id}
            />
          </div>
        </div>,
      ];
    }
    if (n > 2) {
      for (i = 2; i < n; i += 2) {
        if (i + 1 == n) {
          items.push(
            <div class="carousel-item">
              <div className="row justify-content-center">
                <CommentCard
                  data={this.state.comments[i]}
                  key={this.state.comments[i]._id}
                />
              </div>
            </div>
          );
        } else {
          items.push(
            <div class="carousel-item">
              <div className="row justify-content-center">
                <CommentCard
                  data={this.state.comments[i]}
                  key={this.state.comments[i]._id}
                />
                <CommentCard
                  data={this.state.comments[i + 1]}
                  key={this.state.comments[i + 1]._id}
                />
              </div>
            </div>
          );
        }
      }
    }
    return items;
  }
  render() {
    return (
      <div
        id="carouselExampleControls"
        class="carousel slide CommentCardLayout-card"
        data-ride="carousel"
        data-interval="false"
      >
        <h3>Comment</h3>
        <ol class="carousel-indicators" style={{ height: "10px" }}>
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          {this.state.comments && this.getIndicator()}
        </ol>
        <div class="carousel-inner">
          {this.state.comments && this.getComment()}
        </div>
        <a
          class="carousel-control-prev arrowBtn"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next arrowBtn"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    );
  }
  async componentDidMount() {
    let comments = await Util.getComment(this.props.detail._id);
    this.setState({ comments });
    console.log(comments);
  }
}
