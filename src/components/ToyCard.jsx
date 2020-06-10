import React, { Component } from 'react';
// import data from '../data'

class ToyCard extends Component {

  state = {
    toyLike: this.props.likes
  }

  handleAddLike = () => {
    const newLike = this.state.toyLike + 1
    fetch(`http://localhost:3000/toys/${this.props.id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: newLike
      }),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        toyLike: this.state.toyLike + 1
      })
    })
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.name /* Toy's Name */}</h2>
        <img src={this.props.image /* Toy's Image */} alt={this.props.name/* Toy's Name */} className="toy-avatar" />
        <p>{this.state.toyLike /* Toy's Likes */} Likes </p>
        <button onClick={this.handleAddLike} className="like-btn">Like {'<3'}</button>
        <button onClick={() => this.props.handleDeleteToy(this.props)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
