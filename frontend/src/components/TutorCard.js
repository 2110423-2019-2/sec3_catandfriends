import React, { Component } from 'react'
import "./TutorCard.css"
export default class TutorCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:"Karnkitti Kittikamron",
             link:"/Karnkitti",
             imgsrc:"https://i.ibb.co/8NHMg4K/pic.png"
        }
    }
    
    render() {
        return (
            <div className="card " style={{width: "12rem", textAlign:"center"}}>
                <img src={this.props.imgsrc} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <a href={this.props.link} className="btn btn-info">Tutor's Profile</a>
                </div>
            </div>
           
        )
    }
}
