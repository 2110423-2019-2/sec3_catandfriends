import React from 'react'
import './RequestScrollBar.css'
import 'bootstrap'

const initialList=[
  { id: 'a', name: 'Student Name',courseName:"Course Name" },
  { id: 'b', name: 'Student Name',courseName:"Course Name" },
  { id: 'c', name: 'Student Name',courseName:"Course Name" },
];
const RequestScrollBar=()=>{
  const [list, setList] = React.useState(initialList);

  const handleAccept = id =>{
      setList(list.filter(item=>item.id !==id));
      //add student to class
  };

  const handleReject = id =>{
    setList(list.filter(item=>item.id !==id));
    //do nothing
};
    return(
        <div className="card" data-spy="scroll" id="overflowTest" > 
              {list.map(item => (
        <table class="table table-borderless" key={item.id}>
          <td><label>{item.name}</label></td>
          <td><label>{item.courseName}</label></td>
          <td><button type="button" className="btn btn-success" onClick={() => handleAccept(item.id)}>
            Accept
          </button></td>
          <td><button type="button" className="btn btn-danger" onClick={() => handleReject(item.id)}>
            Reject
          </button></td>
        </table>
      ))}
        </div>
    );
  }

export default RequestScrollBar