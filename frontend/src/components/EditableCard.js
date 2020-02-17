import React from 'react';
import history from './../history';
import './CourseCard.css';
import './EditableCard.css';

class  CardHeader extends React.Component{
    
    render(){
        const { image } = this.props;
        var style = {
            backgroundImage: 'url(' + image + ')' };
    return (
      React.createElement("header", { style: style, id: image, className: "card-header" },
        React.createElement("h6", {className: "card-header--title"}, "Category"),
        <EditBtn onclick={() => history.push('/EditCourse')}></EditBtn>
        )
    );
    }
}

class Button extends React.Component{
    render(){
        return(
            <div>
            <button type="button" class="button button-primary"   data-toggle="modal" data-target="#myModal">
                <i className="fa fa-chevron-right">Course detail</i>
            </button>
            <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-body">
                <p>go to course detail.</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
            </div>
            </div>
        );
    }
}
class EditBtn extends React.Component{
    render(){
        return(
            <div>
            <button type="button" class="button button-secondary"   data-toggle="modal" data-target="#editModal">
                <i className="fa fa-edit"> edit</i>
            </button>
            <div class="modal fade" id="editModal" role="dialog">
            <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-body">
                <p>go to edit course.</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
            </div>
            </div>
        )
    }
}
class CardBody extends React.Component{
    render(){
        return(
            React.createElement("div", { className: "card-body" },
                React.createElement("p", { className: "date" }, "20 February 2020"),

                React.createElement("h5", {className: "course-name"}, this.props.title),

                React.createElement("p", { className: "body-content" }, this.props.text),

                <Button onclick={() => history.push('/Course')}></Button>
            )
        );
    }
}

class EditableCard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            courseID: "00001",
            courseName: "EWEf",
            category: "few",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        };
    }
    render(){
        return(
            React.createElement("article", { className: "CourseCard" },
                React.createElement(CardHeader, { image: 'https://source.unsplash.com/user/erondu/600x400' }),
                React.createElement(CardBody, { title: 'Course Name', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' })
                )
        );
    }
}

export default EditableCard;
