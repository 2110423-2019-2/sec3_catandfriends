import React, { Component } from 'react'
import { Route, Switch,Link } from 'react-router-dom'

const Home = () => <h1>Home</h1>
const About = () => <h1>About</h1>
const Post = () => <h1>Post</h1>
const Project = () => <h1>Project</h1>
const NotFoundPage = ()=> <h1>404: Page Not Found</h1>

class App extends Component {
  render() {
    return (
      <div className="my-app">
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item" to="https://devahoy.com">
                <img src="https://devahoy.com/assets/images/devahoy-text-logo.png" alt="DEVAHOY LOGO" width="112" height="28" />
                </Link>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/posts" className="navbar-item">Posts</Link>
                <Link to="/projects" className="navbar-item">Projects</Link>
                <Link to="/about" className="navbar-item">About</Link>
                <Link class="navbar-item" to="https://github.com/phonbopit" target="_blank">Star on <i className="fab fa-github"></i></Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="App container">
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/post" component={Post} />
          <Route path="/project" component={Project} />
        </div>
      </div>
    )
  }
}

export default App