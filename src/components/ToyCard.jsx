import React, { Component } from 'react';

class ToyCard extends Component {

  state = {
    likes: this.props.likes
  }

  handleLike = () => {
    const newLikes = this.props.likes + 1;
    fetch(`http://localhost:3000/toys/${this.props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: newLikes})
    }).then(res => res.json())
    .then(likes => this.setState(prevState => ({likes: prevState.likes + 1})
  ))
  }

  handleDelete = () => {
    fetch(`http://localhost:3000/toys/${this.props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then( res => res.json() )
    .then( () => this.props.update() )
  }

  render() {

    let {name,image,likes,id} = this.props
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button className="like-btn" onClick={this.handleLike}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
