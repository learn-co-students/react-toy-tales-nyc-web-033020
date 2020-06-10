import React, { Component } from 'react';
// import toyData from '../data';

class ToyCard extends Component {

  state = {
    likes: this.props.likes
  }

  clickLike = () => {
    const incrementLikeCount = this.state.likes + 1

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ likes: incrementLikeCount })
    }
    
    fetch(`http://localhost:3000/toys/${this.props.id}`, options)
    .then(res => res.json())
    .then(this.setState({likes: incrementLikeCount})
  )}

  clickDelete = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
      fetch(`http://localhost:3000/toys/${this.props.id}`,options) 
      .then( res => res.json() )
      .then(this.props.reRender)
    }
  



  render() {
    console.log(this.props.likes)
    return (
      <div className="card">
        <h2>{this.props.name}</h2>
        <img src={this.props.image} alt={this.props.name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button className="like-btn" onClick={this.clickLike}>Likes {this.state.likes}</button>
        <button className="del-btn" onClick={this.clickDelete}>Donate to GoodWill</button>
      </div>
    )};
  }



export default ToyCard;
