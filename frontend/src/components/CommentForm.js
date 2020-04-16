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
                rating: null,
                isCommented:false
            }
        };
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

     async handleSubmitCreate(event){
        event.preventDefault();
        console.log(this.state.comments)
        if (!this.state.comments.rating){
            alert("Please input rating")
            return;
        }
         let data = //this.state.comments.isCommented==false? Util.editComment(
        //     window.location.search.substring(10),
        //     this.state.comments.topic,
        //     this.state.comments.text,
        //     this.state.comments.rating,
        //     localStorage.getItem("token")
        // )
        // : 
            await Util.createComment(
            this.props.detail._id,
            this.state.comments.topic,
            this.state.comments.text,
            this.state.comments.rating,
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
            this.state.comments.rating,
        );
        alert(data);
        window.location.reload();
    }
    handleChange(event){
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
        [name]: value
        });
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
                                value={this.state.comments.topic}
                                onChange={(event, newValue) => {
                                    this.setState(prevState=>{
                                        let comments=Object.assign({}, prevState.comments);
                                        comments.topic = newValue;
                                        return {comments};
                                        });
                                    }
                                } 
                                placeholder="Title"
                                style={{width:500, height:30,resize:"none"}}/>
                        </div>
                        <div className="col-3"> 
                        <Rating
                            name="hover-feedback"
                            defalutvalue={this.state.comments.rating}
                            value={this.state.comments.rating}
                            precision={0.5}
                            required
                            onChange={(event, newValue) => {
                                this.setState(prevState=>{
                                    let comments=Object.assign({}, prevState.comments);
                                    comments.rating = newValue;
                                    return {comments};
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
                                value={this.state.comments.text}
                                onChange={(event, newValue) => {
                                    this.setState(prevState=>{
                                        let comments=Object.assign({}, prevState.comments);
                                        comments.text = newValue;
                                        return {comments};
                                        });
                                    }
                                } 
                                placeholder="Comment"
                                style={{width:500, height:150,resize: "none"}}/>
                        </div>
                        <div className="col-3" align="center">
                            {this.state.comments.isCommented ? (
                            <button className="button-white" style={{width:100}} onClick={(event)=>{this.handleSubmitEdit(event)}}>Edit</button>
                            ) : (
                            <button className="button-white" style={{width:100}} onClick={(event)=>{this.handleSubmitCreate(event)}}>Comment</button>
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
        console.log(this.state.comments);
      }
        // console.log(window.location.search.substring(10));
        // console.log(localStorage.getItem("token"));
        // let data = await Util.getComment(localStorage.getItem("token"),window.location.search.substring(10));
        // this.setState(data);
        // console.log(data)
        // console.log(this.state.comments)
    // }
}