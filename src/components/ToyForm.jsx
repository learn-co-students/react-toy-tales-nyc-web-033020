import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: 'bobby',
    image: ''
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form">
          <h3>Create a toy!</h3>
          <input type="text" name="name" value={this.state.name} onChange={this.props.handleNameChange} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" value={this.state.image} onChange={this.props.handleImageChange} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
