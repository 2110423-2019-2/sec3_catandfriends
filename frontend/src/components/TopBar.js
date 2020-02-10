
import React, { Component } from 'react'

import history from "../history";
import"./TopBar.css";

export class Home extends Component {
    render() {
        return (
            <div className="topBar">
                <span>logo</span>
                <button className="topBarSearchButton" onClick={this.onClickSearch}>Search</button>
            </div>
        )
    }

    onClickSearch = () =>{
        history.push('/search');
    }
}

export default Home


