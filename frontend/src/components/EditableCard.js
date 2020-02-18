import React from 'react';
import history from './../history';
import './CourseCard.css';
import './EditableCard.css';
class CardHeader extends React.Component {
    render() {
      return (
        <header
          style={{
            backgroundImage: `url(${this.props.imgsrc})`
          }}
          id="image"
          className="mcard-header"
        >
          <h6
            className="mcard-header--title"
            style={{ paddingLeft: "7px", paddingTop: "4px" }}
          >
            {this.props.category}
          </h6>
          <EditBtn onclick={() => history.push('/EditCourse')} style={{paddingLeft:"100px"}}></EditBtn>
        </header>
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
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="mcard-body">
                <p className="date">{this.props.date}</p>
                <h5 className="course-name">{this.props.title}</h5>
                <p className="body-content">{this.props.text}</p>
                <body style={{ textAlign: "right" }}>{this.props.price + ".-"}</body>
                <body>
                    <Button onclick={() => history.push('/Course')}></Button>
                </body>
            </div>
        );
    }
}

class EditableCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            courseID: "00002",
          courseName: "b",
          image: "https://source.unsplash.com/user/erondu/600x400",
          category: "more",
          description: "TS",
          price: "4500",
          date: "Tuedays 8.00-10.00"
        }
    }
    render() {
        const {
          courseID,
          courseName,
          image,
          category,
          description,
          price,
          date
        } = this.props.detail;
        return(
            <article className="CourseCard">
                <CardHeader imgsrc={image} category={category}></CardHeader>
                <CardBody
                    title={courseName}
                    text={description}
                    price={price}
                    date={date}
                ></CardBody>
            </article>
        );
    }
}

export default EditableCard;
