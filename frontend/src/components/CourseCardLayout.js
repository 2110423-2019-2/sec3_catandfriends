import React from 'react';
import CourseCard from "./CourseCard";

class CourseCardLayout extends React.Component{
    render(){
        return(
            <div className="row">
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
            </div>
        );
    }
}

export default CourseCardLayout;