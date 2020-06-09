import React, { Component } from 'react';

class ToyCard extends Component {
  render() {
    // console.log("card:::", this.props)
    const {name,image,likes,deleteToy,id ,addLikes} = this.props
    return (
      <div className="card" >
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p> Likes </p>
        <button className="like-btn" onClick={()=>addLikes(id)}> {likes}Like {'<3'}</button>
        <button className="del-btn" onClick={()=>deleteToy(id)}>Donate to GoodWill </button>
      </div>
    );
  }

}

export default ToyCard;
