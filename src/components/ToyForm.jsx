import React, { Component } from 'react';

class ToyForm extends Component {

  handleSubmit = (event) => {    
    event.persist()
    event.preventDefault()

    const form = event.target
    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, body: JSON.stringify({
        name: form.name.value,
        image: form.image.value,
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
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;