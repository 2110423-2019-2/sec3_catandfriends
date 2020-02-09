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
                <img src={this.state.imgsrc} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">{this.state.name}</h5>
                        <a href={this.state.link} class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
           
        )
    }
}
