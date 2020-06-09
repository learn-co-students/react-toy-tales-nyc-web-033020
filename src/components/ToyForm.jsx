import React, { Component } from 'react';

class ToyForm extends Component {

  render() {
    console.log("form::::", this.props)
    const {name, image, changeHandler, submitHandler} = this.props
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={submitHandler}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={name} onChange={changeHandler}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"value={image} onChange={changeHandler}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
