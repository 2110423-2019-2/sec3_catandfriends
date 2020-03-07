import React, { Component } from 'react'
import Filter from './Filter'
import EnrollSchedule from './EnrollSchedule'

export default class Cat extends Component {
    render() {
        return (
            <div>
                <Filter/>
                <EnrollSchedule/>
            </div>
        )
    }
}
