import React, { Component } from 'react';

class ToyForm extends Component {

  state={
    name: '',
    image: ''
  }

  handleName = (event) => {
    this.setState({name: event.target.value})
  }

  handleImage = (event) => {
    this.setState({image: event.target.value})
  }

  handleSubmit = (event) => {    
    event.persist()
    event.preventDefault()

    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, body: JSON.stringify({
        name: this.state.name,
        image: this.state.image,
        likes: 0
      })
    }

    fetch('http://localhost:3000/toys', options)
    .then(res => res.json())
    .then(this.props.reRender)
    
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" onChange={this.handleName} value={this.state.name} name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" onChange={this.handleImage}name="image" value={this.state.image}laceholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;