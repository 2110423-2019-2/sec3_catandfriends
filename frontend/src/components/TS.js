import React, { Component } from 'react'
import EnrollTable from "./EnrollTable"
import ScheduleTable from "./ScheduleTable"
import Filter from "./Filter"
export default class TS extends Component {
    render() {
        return (
            <div>
                <EnrollTable/>
                <Filter/>
                <ScheduleTable/>
            </div>
        )
    }
}
