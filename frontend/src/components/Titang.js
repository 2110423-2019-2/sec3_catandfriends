import React, { Component } from 'react'
import Comment from './Comment'
import StudentCard from './StudentCard'
import MyStudentCard from './MyStudentCard'
import TutorCard from './TutorCard'
import VerifyCard from './VerifyCard'
export default class Titang extends Component {
    render() {
        return (
            <div>
                <MyStudentCard/>
                <StudentCard/>
                <TutorCard/>
                <VerifyCard/>
                <Comment />
            </div>
        )
    }
}
