import React, { Component } from "react";

import "./Chatbox.css";
import Util from "../apis/Util";

export class Chatbox extends Component {
  state = { message: [] };
  render() {
    if (this.state.users) {
      return (
        <div className="container py-5 px-4">
          <div className="row rounded-lg overflow-hidden shadow">
            <UserBoxes
              users={this.state.users}
              onClickUser={this.onClickUser}
            />
            <MessageBox
              message={this.state.message}
              roomId={this.state.roomId}
            />
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  async componentDidMount() {
    if (window.location.search) {
      let params = new URLSearchParams(window.location.search);
      var response = await Util.getChatUserBox(params.get("userId"));
      this.onClickUser(response._id);
    }
    var data = await Util.getChatUserBoxes();
    var users = [];
    data.forEach(element => {
      let user = Util.getProfile(element.userId);
      users.push(user);
    });
    users = await Promise.all(users);
    for (let i = 0; i < users.length; i++) {
      users[i].roomId = data[i]._id;
    }
    this.setState({ users });
  }

  getMessage = async roomId => {
    var data = await Util.getMessage(roomId);
    this.setState({ message: data });
  };

  onClickUser = async roomId => {
    var data = await Util.getMessage(roomId);
    this.setState({ roomId });
    this.setState({ message: data });
    setInterval(() => this.getMessage(this.state.roomId), 2000);
  };
}

export default Chatbox;

class UserBoxes extends Component {
  render() {
    console.log(this.props.users);
    return (
      <div className="col-5 px-0">
        <div className="background-color-trans">
          <div className="px-4 py-2 background-color-trans text-color">
            <p className="h5 mb-0 py-1">Recent</p>
          </div>

          <div className="messages-box">
            <div className="list-group rounded-0">
              {this.props.users.map(user => {
                var userProfile = Util.getProfile(user.userId);
                delete userProfile._id;
                user = { ...user, ...userProfile };
                return (
                  <UserBox user={user} onClickUser={this.props.onClickUser} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class UserBox extends Component {
  render() {
    return (
      <a
        href="#"
        className="list-group-item list-group-item-action rounded-0 background-color"
        onClick={() => {
          this.props.onClickUser(this.props.user.roomId);
        }}
      >
        <div className="media">
          <img
            src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
            alt="user"
            width="50"
            className="rounded-circle"
          />
          <div className="media-body ml-4">
            <div className="d-flex align-items-center justify-content-between mb-1 textnormal">
              <h6 className="mb-0">{this.props.user.firstName}</h6>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

class MessageBox extends Component {
  render() {
    console.log(this.props.message);
    return (
      <div className="col-7 px-0">
        <div className="px-4 py-5 chat-box background-color" id="messageBox">
          {this.props.message.map(msg => {
            if (msg.userId == JSON.parse(localStorage.getItem("user"))._id) {
              return <RecieverMessage message={msg} />;
            } else {
              return <SenderMessage message={msg} />;
            }
          })}
        </div>

        <TypingArea roomId={this.props.roomId} />
      </div>
    );
  }

  componentDidMount() {
    var obj = document.getElementById("messageBox");
    obj.scrollTop = obj.scrollHeight;
  }

  componentDidUpdate() {
    var obj = document.getElementById("messageBox");
    obj.scrollTop = obj.scrollHeight;
  }
}

class SenderMessage extends Component {
  render() {
    return (
      <div className="media w-50 mb-3">
        <img
          src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
          alt="user"
          width="50"
          className="rounded-circle"
        />
        <div className="media-body ml-3">
          <div className="background-color-invert rounded py-2 px-3 mb-2">
            <p className="text-small mb-0 text-color-invert">
              {this.props.message.message}{" "}
            </p>
          </div>
          <p className="small text-muted">
            {this.props.message.timeStamp.substring(0, 10) +
              " " +
              this.props.message.timeStamp.substring(11, 16)}
          </p>
        </div>
      </div>
    );
  }
}

class RecieverMessage extends Component {
  render() {
    return (
      <div className="media w-50 ml-auto mb-3">
        <div className="media-body">
          <div className="bg-primary rounded py-2 px-3 mb-2">
            <p className="text-small mb-0 text-white">
              {this.props.message.message}
            </p>
          </div>
          <p className="small text-muted">
            {this.props.message.timeStamp.substring(0, 10) +
              " " +
              this.props.message.timeStamp.substring(11, 16)}
          </p>
        </div>
      </div>
    );
  }
}

class TypingArea extends Component {
  render() {
    return (
      <form
        onSubmit={event => this.onSubmit(event)}
        className="background-color"
        autoComplete="off"
      >
        <div className="input-group">
          <input
            type="text"
            placeholder="Type a message"
            aria-describedby="button-addon2"
            className="form-control rounded-0 border-0 py-4 background-light"
            id="message"
          />
          <div className="input-group-append">
            <button id="button-addon2" type="submit" className="btn btn-link">
              {" "}
              <span className="material-icons">send</span>
            </button>
          </div>
        </div>
      </form>
    );
  }

  onSubmit = async event => {
    event.preventDefault();
    var response = await Util.sendMessage(
      document.getElementById("message").value,
      this.props.roomId
    );

    document.getElementById("message").value = "";
  };
}
