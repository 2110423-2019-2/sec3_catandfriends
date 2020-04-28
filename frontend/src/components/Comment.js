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
            <div className="card mb-3 w-12 innerbox">
            <div className="row no-gutters ">
              <div className="col-md-4 text-center ">
                <img src={this.state.imgsrc} className="card-img p-2 pic"   alt="..."/>
              </div>
              <div className="col-md-8 ">
                <div className="card-body">
                  <center>
                <a className="card-title title" href={this.state.nameurl}>{this.state.name}</a></center>
                <p className="card-text">{this.state.comment}</p>
                <p className="card-text"><small className="text-muted">Last updated {this.state.date}</small></p>
                </div>
              </div>
            </div>
          </div>
        )
    }
}


