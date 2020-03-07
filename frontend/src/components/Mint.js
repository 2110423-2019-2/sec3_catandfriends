import React, { Component } from 'react'
import CourseCard from "./CourseCard"
import EditableCard from "./EditableCard"
import EditCourse from './EditCourse'
import NewCourse from "./NewCourse"
import RequestScrollBar from "./RequestScrollBar"
export default class Mint extends Component {
    render() {
        return (
            <div>
                <CourseCard/>
                <EditableCard/>
                <EditCourse/>
                <NewCourse/>
                <RequestScrollBar/>
            </div>
        )
    }
}
