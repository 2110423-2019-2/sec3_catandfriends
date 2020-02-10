import React from 'react';
import './course_detail.css';
import mypic from './picture/bg-01.jpg';
import { render } from '@testing-library/react';

function course_detail() {
  var title = "Course details"
  return (
    <div className="App">
      <img 
        src= {mypic}
        alt = "this pic" 
        className = "MyPicStyle"
      />

      <table className = "MyText">
        <h1>{title}</h1>
        <h2>Course name : </h2>
        <h2>date :</h2>
        <button 
        className = "MyButton">
          Request
        </button>
      </table>
      
    </div>
  );
}

export default course_detail;
