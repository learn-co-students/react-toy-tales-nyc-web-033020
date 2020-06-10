import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component{

  state = {
    allToys: [],
    display: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys/')
    .then(res => res.json())
    .then(data => {
      this.setState({
        allToys: data
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleAddToy = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/toys/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: e.target.name.value, 
        image: e.target.image.value, 
        likes: 0
      }),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        allToys: [...this.state.allToys, data]
      })
    })
  }

  handleDeleteToy = (oneToy) => {
    fetch(`http://localhost:3000/toys/${oneToy.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(() => {
      const delToy = this.state.allToys.filter(toy => toy.id !== oneToy.id )
      this.setState({
        allToys: delToy
      })
    })

  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleAddToy={this.handleAddToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer allToys={this.state.allToys} handleDeleteToy={this.handleDeleteToy}/>
      </>
    );
  }

}

export default App;
