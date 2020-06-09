import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: '',
    image: ''
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  handleImageChange = (event) => {
    this.setState({image: event.target.value})
  }

  submitNewToy = (e) => {
    e.persist()
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, body: JSON.stringify({
        name: this.state.newToy.name,
        image: this.state.newToy.image,
        likes: 0
      })
    }).then(res => res.json())
    .then(newToy => this.setState({
      toys: [...this.state.toys, newToy]
    }))
    this.setState({
      newToy: {
        name: '',
        image: ''
      }
    })
}

  handleSubmit = (event) => {
    event.persist()
    event.preventDefault()

    options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, body: JSON.stringify({
        name: this.state.newToy.name,
        image: this.state.newToy.image,
        likes: 0
      })
    }
    
    fetch('http://localhost:3000/toys', options)
    .then(res => res.json())
    .then(newToy => this.setState({
      toys: [...this.state.toys, newToy]
    }))
    this.setState({
      newToy: {
        name: '',
        image: ''
      }
    })
    
    
  }

  render() {
    console.log(this.state)
    return (
      <div className="container">
        <form className="add-toy-form">
          <h3>Create a toy!</h3>
          <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" value={this.state.image} onChange={this.handleImageChange} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" onClick={this.handleSubmit} name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
