import React, {Component} from "react";
import history from "../history";
import Rating from '@material-ui/lab/Rating';
export default class CommentForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            comment: "",
            rating: 0,
            isCommented:true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        alert(JSON.stringify(this.state));
        console.log(this.state)
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
                                    rating:newValue
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
                                        comment:event.target.value
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
}