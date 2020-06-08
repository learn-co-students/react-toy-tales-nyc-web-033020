import React, { Component } from 'react';

class ToyForm extends Component {



  render() {
    console.log(this.props.submitNewToy)
    return (
      <div className="container">
        <form onSubmit={this.props.submitNewToy} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={this.props.handleOnchange} type="text" name="name" value={this.props.name} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={this.props.handleOnchange} type="text" name="image" value={this.props.image} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
