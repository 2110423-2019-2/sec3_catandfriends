import React from "react";
import CourseCard from "./CourseCard";
import "./CourseCardLayout.css";
class CourseCardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row cardblock justify-content-center">
          {this.state.data.map(item => (
            <CourseCard detail={item} key={item._id.toString()} />
          ))}
        </div>
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data != this.state.data;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(`prevProps: ${JSON.stringify(prevProps.data)}`);
  }
}

export default CourseCardLayout;
