import React from 'react';

function ScheduleRow(props) {
    return (
        <tr>
            <td>{props.courseName}</td>
            <td>{props.tutorName}</td>
            <td>{props.enrollDate}</td>
            <td>{props.startDate}</td>
            <td>{props.endDate}</td>
        </tr>
    );
}

class ScheduleTable extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let enrollRow = this.props.enrollList.map(
            (enroll) => <ScheduleRow
                courseName={enroll.courseName}
                tutorName={enroll.tutorName}
                enrollDate={enroll.enrollDate}
                startDate={enroll.startDate}
                endDate={enroll.endDate}
            />
        );
        return (
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Tutor Name</th>
                        <th>Enroll Date</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollRow}
                </tbody>
            </table>
        );
    }
}
/*
let testEnrollList = [
    {
        courseName: 'course1',
        tutorName: 'tutor1',
        enrollDate: 'enrollDate1',
        startDate: 'startDate1',
        endDate: 'endDate1'
    },
    {
        courseName: 'course2',
        tutorName: 'tutor2',
        enrollDate: 'enrollDate2',
        startDate: 'startDate2',
        endDate: 'endDate2'
    },
    {
        courseName: 'course3',
        tutorName: 'tutor3',
        enrollDate: 'enrollDate3',
        startDate: 'startDate3',
        endDate: 'endDate3'
    }
];

ReactDOM.render(
    <ScheduleTable enrollList={testEnrollList} />,
    document.getElementById('root')
);
*/

export default ScheduleTable;