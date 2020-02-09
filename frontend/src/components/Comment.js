import React, { Component } from 'react'
import "./Comment.css"
export default class Comment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             imgsrc: "https://i.ibb.co/8NHMg4K/pic.png",
             name: "TS",
             comment: "You know when you know when you know when you know you know",
             date:"12/13/1989",
             nameurl:"kkk"
        }
    }
    
    render() {
        return (
            <div class="card mb-3 w-12" style={{maxWidth:430}}>
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src={this.state.imgsrc} class="card-img p-3"  alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                <a class="card-title title" href={this.state.nameurl} >{this.state.name}</a>
                <p class="card-text">{this.state.comment}</p>
                <p class="card-text"><small class="text-muted">Last updated {this.state.date}</small></p>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
