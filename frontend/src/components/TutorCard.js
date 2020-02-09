import React, { Component } from 'react'

export default class TutorCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:"Karnkitti Kittikamron",
             contact:"@karnkittik",
             link:"/Karnkitti",
             imgsrc:"https://i.ibb.co/8NHMg4K/pic.png"
        }
    }
    
    render() {
        return (
            <div className="card" style={{width: "18rem"}}>
                <img src={this.state.imgsrc} class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.name}</h5>
                        <p class="card-text">{this.state.contact}</p>
                        <a href={this.state.link} class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
           
        )
    }
}
