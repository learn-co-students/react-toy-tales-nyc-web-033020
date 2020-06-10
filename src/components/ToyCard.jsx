import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    console.log(this.props)
    const { id, name, image, likes, donateToy, incrementLikes } = this.props
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={()=>incrementLikes(id, likes)}>Like {'<3'}</button>
        <button onClick={()=> donateToy(id)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;

// "name": "Woody",
// "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
// "likes": 2