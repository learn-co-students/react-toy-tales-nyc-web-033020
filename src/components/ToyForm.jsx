import React, { Component } from "react";

class ToyForm extends Component {
  render() {
    const { name, image } = this.props.newToy;
    return (
      <div className="container">
        <form className="add-toy-form">
          <h3>Create a toy!</h3>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter a toy's name..."
            className="input-text"
            onChange={this.props.handleForm}
          />
          <br />
          <input
            type="text"
            name="image"
            value={image}
            placeholder="Enter a toy's image URL..."
            className="input-text"
            onChange={this.props.handleForm}
          />
          <br />
          <input
            onClick={this.props.handleSubmit}
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
