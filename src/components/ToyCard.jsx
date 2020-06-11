import React, { Component } from 'react';

class ToyCard extends Component {

  handleClick = (e) => {

    const {id, likes, increaseLikes, deleteToy} = this.props;

    if(e.target.name === "likes"){
      increaseLikes(id, (likes + 1))
    } else if (e.target.name === "donate"){
      deleteToy(id)
    }
  };

  render() {
    const {name, image, likes} = this.props

    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button 
          name="likes" 
          className="like-btn" 
          onClick={this.handleClick}
        >
          Like {'<3'}
        </button>
        <button 
          name="donate" 
          className="del-btn" 
          onClick={this.handleClick}
        >
          Donate to GoodWill
        </button>
      </div>
    );
  }

}

export default ToyCard;
