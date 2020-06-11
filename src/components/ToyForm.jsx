import React, { Component } from 'react';

const TOYS_URL = 'http://localhost:3000/toys'
const headers = {'Content-Type': 'application/json', Accept: 'application/json'}

class ToyForm extends Component {

  state = {
    name: '',
    image: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(TOYS_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(this.state)
    })
      .then(resp => resp.json())
      .then(toy => {
        this.props.addToy(toy)
        this.setState({
          name: '',
          image: ''
        })       
      })
    this.props.handleClick()     
  };

  render() {
    const {name, image} = this.state
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input 
            type="text" 
            name="name" 
            value={name} 
            placeholder="Enter a toy's name..." 
            className="input-text"
            onChange={this.handleChange}
          />
          <br/>
          <input 
            type="text" 
            name="image" 
            value={image} 
            placeholder="Enter a toy's image URL..." 
            className="input-text"
            onChange={this.handleChange}
          />
          <br/>
          <input 
            type="submit" 
            name="submit" 
            value="Create New Toy" 
            className="submit"
          />
        </form>
      </div>
    );
  }

}

export default ToyForm;
