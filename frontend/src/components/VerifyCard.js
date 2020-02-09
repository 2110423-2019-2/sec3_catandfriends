import React, { Component } from 'react'

export default class VerifyCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             selectedFile: null
        }
    }
    
    onChangeHandler = event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        })
    }
    render() {
        return (
            <div>
            <input type="file" name="file" onChange={this.onChangeHandler}/>
            </div>
        )
    }
}
