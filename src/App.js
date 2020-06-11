import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'

const TOYS_URL = 'http://localhost:3000/toys'
const headers = {'Content-Type': 'application/json', Accept: 'application/json'}

class App extends React.Component{

  state = {
    toys: [],
    display: false
  }

  componentDidMount(){
    fetch(TOYS_URL)
    .then(resp => resp.json())
    .then(toys => {
      this.setState( {toys} )
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy = (toy) => {
    let newArray = [...this.state.toys]
    newArray.push(toy)
    this.setState({
      toys: newArray
    })
  };

  deleteToy = (toyId) => {
    fetch(`${TOYS_URL}/${toyId}`, {
      method: "DELETE"
    })
    let newArray = [...this.state.toys]
    const toyIndex = newArray.findIndex(toy => toy.id === toyId)
    // console.log(toyIndex)
    newArray.splice(toyIndex, 1)
    this.setState({
      toys: newArray
    })
  };

  increaseLikes = (toyId, likesPlusOne) => {
    fetch(`${TOYS_URL}/${toyId}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({ likes: likesPlusOne})
    })
      .then(resp => resp.json())
      .then(updatedToy => {
        let newArray = [...this.state.toys]
        const toyIndex = newArray.findIndex(toy => toy.id === toyId)
        newArray[toyIndex] = updatedToy
        this.setState({
          toys: newArray
        })
      })
  };

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy} handleClick={this.handleClick}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> {this.state.display? 'Hide Form' : 'Add a Toy' } </button>
        </div>
        <ToyContainer 
          toys={this.state.toys} 
          deleteToy={this.deleteToy}
          increaseLikes={this.increaseLikes}
        />
      </>
    );
  }

}

export default App;
