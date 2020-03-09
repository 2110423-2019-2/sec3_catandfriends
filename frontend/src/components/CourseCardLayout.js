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
      <div className="row border cardblock">
        {this.state.data.map(item => (
          <CourseCard detail={item} key={item._id.toString()} />
        ))}
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
