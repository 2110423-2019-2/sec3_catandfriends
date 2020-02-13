import React from 'react';

function EnrollRow(props) {
    return (
        <tr>
            <td>{props.courseName}</td>
            <td>{props.tutorName}</td>
            <td>{props.enrollDate}</td>
        </tr>
    );
}

class EnrollTable extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let enrollRow = this.props.enrollList.map(
            (enroll) => <EnrollRow
                courseName={enroll.courseName}
                tutorName={enroll.tutorName}
                enrollDate={enroll.enrollDate}
            />
        );
        return (
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Tutor Name</th>
                        <th>Enroll Date</th>
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
        enrollDate: 'date1'
    },
    {
        courseName: 'course2',
        tutorName: 'tutor2',
        enrollDate: 'date2'
    },
    {
        courseName: 'course3',
        tutorName: 'tutor3',
        enrollDate: 'date3'
    }
];

ReactDOM.render(
    <EnrollTable enrollList={testEnrollList} />,
    document.getElementById('root')
);
*/
export default EnrollTable;