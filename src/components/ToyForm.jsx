import React, { Component } from 'react';

class ToyForm extends Component {

  state ={
    name: '',
    image: ''
  }

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault()

    fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {"Content-Type":"application/json",
              Accept: "application/json"
        },
    body: JSON.stringify({
      name: this.state.name,
      image: this.state.image,
      likes: 0
    })
    }
    )
    .then(resp => resp.json())
    .then(toy => this.props.addToy(toy))
    // this.props.toys.push({
    //   id: this.props.toys.length+1,
    //   name: this.state.name,
    //   image: this.state.image,
    //   likes: 0
    // })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={event => this.handleSubmit(event)}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={event => this.handleChange(event)} value={this.state.name}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={event => this.handleChange(event)} value={this.state.image}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
