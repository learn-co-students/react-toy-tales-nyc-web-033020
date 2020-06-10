import React, { Component } from 'react';

class ToyForm extends Component {
  state = { 
    name: '',
    image: '',
    likes: 0
  }

  handleFormInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  

  



  render() {
    console.log('States', this.state, 'Props', this.props)
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={(event) => this.props.handleSubmit(event, this.state)}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" onChange={this.handleFormInput} 
          value={this.state.name} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>

          <input type="text" name="image" onChange={this.handleFormInput} 
          value={this.state.image} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>

          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
