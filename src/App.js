import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'
const TOYS_API = 'http://localhost:3000/toys'

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }



  componentDidMount() {
    fetch(TOYS_API)
    .then(res => res.json())
    .then(toys => {
      this.setState({ toys })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  incrementLikes = (id, likes) => {
    fetch(`${TOYS_API}/${id}`,{
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ 
        likes: likes + 1
       })
    }).then(res => res.json())
    .then(updatedToy => {
      let updateToys = this.state.toys.map(toy => 
        toy.id === id ? updatedToy : toy)
        this.setState({
          toys: updateToys
        })
    })
  }

  handleSubmit = (e, newToy) => {
    e.preventDefault()
   fetch(TOYS_API, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(newToy)
   })
    .then(res => res.json())
    .then(newToy => {
      this.setState({
        toys: [...this.state.toys, newToy]
      })
    })
  }

  donateToy = (id) => {
    // const toyToDonate = this.state.toys.find(toy => toy.id === id)
    const newToyList = this.state.toys.filter(toy => toy.id !== id )
    this.setState(prevState => ({
      toys: newToyList
    }))
    fetch(`${TOYS_API}/${id}`,{
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  render(){
    console.log(this.state.toys)
    return (
      <>
        <Header/>
        { 
          this.state.display ? <ToyForm handleSubmit={this.handleSubmit}/> : null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donateToy={this.donateToy} incrementLikes={this.incrementLikes}/>
      </>
    );
  }

}

export default App;
