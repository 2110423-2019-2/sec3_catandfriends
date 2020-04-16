import React, {Component} from "react";
import Rating from '@material-ui/lab/Rating';
import Util from "../apis/Util";
export default class CommentForm extends Component {
    constructor(props){
        super(props);

        this.state= {
           comments:{
                _id:"",
                topic: "",
                text: "",
                star: null,
                isCommented:false
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

     async handleSubmitCreate(event){
        event.preventDefault();
        console.log(this.state.comments)
        if (!this.state.comments.star){
            alert("Please input rating")
            return;
        }
         let data = //this.state.comments.isCommented==false? Util.editComment(
        //     window.location.search.substring(10),
        //     this.state.comments.topic,
        //     this.state.comments.text,
        //     this.state.comments.star,
        //     localStorage.getItem("token")
        // )
        // : 
            await Util.createComment(
            this.props.detail._id,
            this.state.comments.topic,
            this.state.comments.text,
            this.state.comments.star,
        );
        alert(data);
        window.location.reload();
    }
    async handleSubmitEdit(event){
        event.preventDefault();
        console.log(this.state.comments)
        let data = Util.editComment(
            this.props.detail._id,
            this.state.comments.topic,
            this.state.comments.text,
            this.state.comments.star,
        );
        alert(data);
        window.location.reload();
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
                                valued={this.state.comments.topic}
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
                            value={this.state.comments.rating}
                            precision={0.5}
                            required
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
                                value={this.state.comments.comment}
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
                            {this.state.comments.isCommented ? (
                            <button className="button-white" style={{width:100}} onClick={this.handleSubmitEdit()}>Edit</button>
                            ) : (
                            <button className="button-white" style={{width:100}} onClick={this.handleSubmitCreate()}>Comment</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    async componentDidMount(){
        let comments = await Util.getMyComment(this.props.detail._id);
        this.setState({ comments });
        console.log(comments);
      }
        // console.log(window.location.search.substring(10));
        // console.log(localStorage.getItem("token"));
        // let data = await Util.getComment(localStorage.getItem("token"),window.location.search.substring(10));
        // this.setState(data);
        // console.log(data)
        // console.log(this.state.comments)
    // }
}