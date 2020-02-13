import React from 'react'

function CheckboxTemplate(props) {
    return (
        <li>
            <input
                id={props.id}
                type='checkbox'
                checked={props.state}
                onChange={props.handler}
            />
            <label
                htmlFor={props.id}
            >
                {props.text}
            </label>
        </li>
    );
}

function DayGroup(props) {
    return (
        <ul>
            <CheckboxTemplate
                text='Sunday'
                id='sunday'
                state={props.state.sunday}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='Monday'
                id='monday'
                state={props.state.monday}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='Tuesday'
                id='tuesday'
                state={props.state.tuesday}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='Wednesday'
                id='wednesday'
                state={props.state.wednesday}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='Thursday'
                id='thursday'
                state={props.state.thursday}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='Friday'
                id='friday'
                state={props.state.friday}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='Saturday'
                id='saturday'
                state={props.state.saturday}
                handler={props.handler}
            />
        </ul>
    );
}

function SubjectGroup(props) {
    return (
        <ul>
            <CheckboxTemplate
                text='Mathematics'
                id='mathematics'
                state={props.state.mathematics}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='Science'
                id='science'
                state={props.state.science}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='Social'
                id='social'
                state={props.state.social}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='Language'
                id='language'
                state={props.state.language}
                handler={props.handler}
            />
        </ul>
    );
}

function TimeGroup(props) {
    return (
        <ul>
            <CheckboxTemplate
                text='6:00 to 8:00'
                id='time6To8'
                state={props.state.time6To8}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='8:00 to 10:00'
                id='time8To10'
                state={props.state.time8To10}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='10:00 to 12:00'
                id='time10To12'
                state={props.state.time10To12}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='12:00 to 14:00'
                id='time12To14'
                state={props.state.time12To14}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='14:00 to 16:00'
                id='time14To16'
                state={props.state.time14To16}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='16:00 to 18:00'
                id='time16To18'
                state={props.state.time16To18}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='18:00 to 20:00'
                id='time18To20'
                state={props.state.time18To20}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='20:00 to 22:00'
                id='time20To22'
                state={props.state.time20To22}
                handler={props.handler}
            />
        </ul>
    );
}

function PriceGroup(props) {
    return (
        <ul>
            <CheckboxTemplate
                text='0 - 500 Baht'
                id='price0To500'
                state={props.state.price0To500}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='500 - 1500 Baht'
                id='price500To1500'
                state={props.state.price500To1500}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='1500 - 3500 Baht'
                id='price1500To3500'
                state={props.state.price1500To3500}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='3500 - 6500 Baht'
                id='price3500To6500'
                state={props.state.price3500To6500}
                handler={props.handler}
            />
            <CheckboxTemplate
                text='6500 Baht and above'
                id='price6500AndAbove'
                state={props.state.price6500AndAbove}
                handler={props.handler}
            />
        </ul>
    );
}

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            subject: {
                mathematics: false,
                science: false,
                social: false,
                language: false,
            },
            time: {
                time6To8: false,
                time8To10: false,
                time10To12: false,
                time12To14: false,
                time14To16: false,
                time16To18: false,
                time18To20: false,
                time20To22: false
            },
            price: {
                price0To500: false,
                price500To1500: false,
                price1500To3500: false,
                price3500To6500: false,
                price6500AndAbove: false
            }
        };
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }
    debug() {
        //console.log(this.state);
    }
    handleDayChange(event) {
        let temp = this.state;
        temp.day[event.target.id] = event.target.checked
        this.setState(temp);
        this.debug();
    }
    handleSubjectChange(event) {
        let temp = this.state;
        temp.subject[event.target.id] = event.target.checked
        this.setState(temp);
        this.debug();
    }
    handleTimeChange(event) {
        let temp = this.state;
        temp.time[event.target.id] = event.target.checked
        this.setState(temp);
        this.debug();
    }
    handlePriceChange(event) {
        let temp = this.state;
        temp.price[event.target.id] = event.target.checked
        this.setState(temp);
        this.debug();
    }
    render() {
        return (
            <div>
                <DayGroup state={this.state.day} handler={this.handleDayChange} />
                <SubjectGroup state={this.state.subject} handler={this.handleSubjectChange} />
                <TimeGroup state={this.state.time} handler={this.handleTimeChange} />
                <PriceGroup state={this.state.price} handler={this.handlePriceChange} />
            </div>
        );
    }
}
/*
ReactDOM.render(
    <Filter />,
    document.getElementById('root')
);
*/
export default Filter;