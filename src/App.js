import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component{

  state = {
    toys: [],
    display: false
  }

  componentDidMount(){
    this.fetchToys()
  }
  
  fetchToys = () =>{
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(dbToys => this.renderToys(dbToys))
  }

  renderToys = (toysArray) =>{
    this.setState({
      toys:toysArray
    })
  }

  addToy = (toy) =>{
    this.setState(prevState =>({
      toys: [...prevState.toys, toy]
    })
    )
  }

  likeToy = (toyId, newlikes) => {
    // this.setState(prevState => {
    //   const updatedToy = prevState.toys.find(toy => toy.id === toyId)
    //   const updatedToyIndex = prevState.toys.findByIndex(toy => toy.id === toyId)
    //   return {
    //     ...prevState, toys:{
    //       ...prevState.toys.filter(toy=> toy.id !== toyId), updatedToy:{
    //         likes: newlikes
    //       }
    //     }
    //   }
    // }
    // )

    fetch(`http://localhost:3000/toys/${toyId}`,{
      method: "PATCH",
      headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
      },
      body: JSON.stringify({
        likes: newlikes
      })
    })
    .then(resp => resp.json())
    .then(newToy => {
      const oldToy = this.state.toys.find(toy=> toy.id === toyId)
      const oldToyIndex = this.state.toys.indexOf(oldToy)
      let updatedToys = [...this.state.toys]
      updatedToys[oldToyIndex] = newToy
      this.setState({
        toys: updatedToys
      })
    })
  }

  deleteToy = (toyId) =>{
    fetch(`http://localhost:3000/toys/${toyId}`,{
      method: "DELETE",
      headers:{ "Content-Type":"application/json",
                Accept: "application/json"
              }
    })
    .then(resp=> resp.json())
    .then(toy=>{
      this.setState(prevState=>({
        toys: prevState.toys.filter(toy => toy.id !== toyId)
      }))
    })

  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm toys={this.state.toys} renderToys={this.renderToys} addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} fetchToys={this.fetchToys} likeToy={this.likeToy} deleteToy={this.deleteToy}/>
      </>
    );
  }

}

export default App;
