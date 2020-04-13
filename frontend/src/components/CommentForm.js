import React, {Component} from "react";
import history from "../history";
import Rating from '@material-ui/lab/Rating';
import Util from "../apis/Util";
export default class CommentForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            text: "",
            star: 0,
            isCommented:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        alert(JSON.stringify(this.state));
        let data = this.state.isCommented==false? await Util.editComment(
            this.state._id,
            this.state.courseId,
            this.state.text,
            this.state.star
        ): await Util.creatComment(
            this.state.courseId,
            this.state.text,
            this.state.star
        );
        console.log(data);
        if (!data.error) {
          alert("A course is edited");
          console.log(data);
        } else {
          window.alert("Cannot Edit Course");
        }
    }
    render() {
        return (
            <div className="bigCard" >
                <form
                 onSubmit={event => this.handleSubmit(event)}
                 style={{ marginLeft: 30 }}
                >
                    <div className="row" style={{marginBottom:5}}>
                        <div className="col-8">
                            <textarea
                                type="text"
                                className="inbox"
                                required
                                valued={this.state.title}
                                onChange={(event, newValue) => {
                                    this.setState({
                                        title:event.target.value
                                        });
                                    }
                                } 
                                placeholder="Title"
                                style={{width:500, height:30,resize:"none"}}/>
                        </div>
                        <div className="col-3">
                        <Rating
                            name="hover-feedback"
                            value={this.state.rating}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                this.setState({
                                    star:newValue
                                    });
                                }
                            } 
                        />
                        </div>                   
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <textarea
                                type="text"
                                className="inbox"
                                required
                                value={this.state.comment}
                                onChange={(event, newValue) => {
                                    this.setState({
                                        text:event.target.value
                                        });
                                    }
                                } 
                                placeholder="Comment"
                                style={{width:500, height:150,resize: "none"}}/>
                        </div>
                        <div className="col-3" align="center">
                            {this.state.isCommented ? (
                            <button className="button-white" style={{width:100}}>Edit</button>
                            ) : (
                            <button className="button-white" style={{width:100}}>Comment</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    async componentDidMount(){
        console.log(window.location.search);
        let data = await Util.getComment();
        this.setState(data);
        this.setState({
            isCommented: true
        });
        console.log(data)
    }
}