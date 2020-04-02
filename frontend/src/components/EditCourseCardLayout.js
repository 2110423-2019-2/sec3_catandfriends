import React from "react";
import EditableCard from "./EditableCard";
import BlankCouseCard from "./BlankCouseCard";
import Util from "../apis/Util";
import "./CourseCardLayout.css";
class EditCourseCardLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // data: [
      //   {
      //     courseID: "00001",
      //     courseName: "a",
      //     image: "https://source.unsplash.com/user/erondu/600x400",
      //     category: "few",
      //     description: "this is it",
      //     price: "4500",
      //     date: "Mondays 8.00-10.00"
      //   },
      //   {
      //     courseID: "00002",
      //     courseName: "b",
      //     image: "https://source.unsplash.com/user/erondu/600x400",
      //     category: "more",
      //     description: "TS",
      //     price: "4500",
      //     date: "Tuedays 8.00-10.00"
      //   },
      //   {
      //     courseID: "00003",
      //     courseName: "c",
      //     image: "https://source.unsplash.com/user/erondu/600x400",
      //     category: "more",
      //     description: "TS",
      //     price: "4550",
      //     date: "Tuedays 8.00-10.00"
      //   },
      //   {
      //     courseID: "00004",
      //     courseName: "d",
      //     image: "https://source.unsplash.com/user/erondu/600x400",
      //     category: "more",
      //     description: "TS",
      //     price: "4300",
      //     date: "Tuedays 8.00-10.00"
      //   },
      //   {
      //     courseID: "00006",
      //     courseName: "e",
      //     image: "https://source.unsplash.com/user/erondu/600x400",
      //     category: "more",
      //     description: "TS",
      //     price: "4600",
      //     date: "Tuedays 8.00-10.00"
      //   },
      //   {
      //     courseID: "00002",
      //     courseName: "b",
      //     image: "https://source.unsplash.com/user/erondu/600x400",
      //     category: "more",
      //     description: "TS",
      //     price: "4500",
      //     date: "Tuedays 8.00-10.00"
      //   }
      // ]
    };
  }
  render() {
    const Emp = <div></div>;
    if (!this.state.data) {
      return Emp;
    } else {
      return (
        <div
          className="justify-content-center"
          style={{ marginTop: "0px" }}
          align="center"
        >
          <div className="row ecardblock justify-content-center">
            <BlankCouseCard />
            {this.state.data.map(item => (
              <EditableCard detail={item} key={item._id.toString()} />
            ))}
          </div>
        </div>
      );
    }
  }

  async componentDidMount() {
    let data = await Util.getCourseByTutorId(this.props.tutorId);
    this.setState({ data });
    console.log(data);
  }
}

export default EditCourseCardLayout;
