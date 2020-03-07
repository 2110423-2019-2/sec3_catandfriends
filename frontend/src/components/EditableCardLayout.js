import React from "react";
import "bootstrap";
import EditableCard from "./EditableCard";
import "./EditableCardLayout.css";

const initialList = [<EditableCard />, <EditableCard />];

const EditableCardLayout = () => {
  const [list, setList] = React.useState(initialList);

  const handleSubmit = event => {
    setList(list.concat(<EditableCard />));
    event.preventDefault();
  };

  return (
    <div>
      <div className="row">
        {list.map(item => (
          <div key={item}>{item}</div>
        ))}
        <div className="space"></div>
        <form onSubmit={handleSubmit}>
          <div className="space-y"></div>
          <button className="button button5" type="submit">
            <i className="fa fa-plus">+</i>
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditableCardLayout;
