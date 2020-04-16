import React, {Component} from "react";
import Rating from '@material-ui/lab/Rating';
import Util from "../apis/Util";
export default class CommentForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            topic: "",
            text: "",
            star: 0,
            isCommented:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

     handleSubmit(event){
        event.preventDefault();
        this.setState({
            isCommented: true
        });
        let data = this.state.isCommented==false? Util.editComment(
            localStorage.getItem("token"),
            this.state.topic,
            this.state.text,
            this.state.star
        )
        :  Util.creatComment(
            localStorage.getItem("token"),
            this.state.topic,
            this.state.text,
            this.state.star
        );
        alert(JSON.stringify(this.state));
        if (!data.error) {
          alert("A comment is edited");
          console.log(data);
        } else {
          window.alert("Cannot comment Course");
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
                                valued={this.state.topic}
                                onChange={(event, newValue) => {
                                    this.setState({
                                        topic:event.target.value
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
        let data = await Util.getComment(localStorage.getItem("token"),window.location.search.substring(10));
        this.setState(data);
        console.log(data)
        console.log(this.state)
    }
}