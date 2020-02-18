import React from 'react';
import './BlankCouseCard.css';

//import '@fortawesome/fontawesome-free';

class BlankCard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            courseID: "",
            courseName: "",
            image:'',
            category: "",
            description: '',
            detail: ''
        };
    }
    render(){
        return(
            <div className="BlankCard" >+</div>
        );
    }
}

export default BlankCard;