import React, { Component } from 'react'
import Filter from '../components/Filter'
import CourseCard from '../components/CourseCard'

export default class SearchResult extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                <Filter/>
                </div>
                <div className="col-md-10">
                <CourseCard/>
                </div>
            </div>
        
        )
    }
}
