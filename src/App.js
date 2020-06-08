import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: [],
    newToy: {
      name: '',
      image: ''
    }
  }


  componentDidMount(){
     fetch('http://localhost:3000/toys')
     .then(res => res.json())
     .then(toys => this.setState({ toys }))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addLike = (id) => {
   const likeToy = this.state.toys.find(toy => toy.id === id)
   const toyCopy = this.state.toys.slice()
   const index = toyCopy.indexOf(likeToy)
   toyCopy[index].likes += 1
   this.setState({ toys: toyCopy })

   fetch('http://localhost:3000/toys' + '/' + id,{
     method: 'PATCH', 
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json'
     }, body: JSON.stringify({ 
       likes: likeToy.likes
     })
   } )
  }

  deleteToy = (id) => {
    this.setState({ toys: this.state.toys.filter(toy => toy.id !== id)})

    fetch('http://localhost:3000/toys' + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
  }

  handleOnchange = (event) => {
    this.setState({ newToy: {...this.state.newToy, [event.target.name]: event.target.value } 
   })
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

  render(){
    console.log(this.state.newToy)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submitNewToy={this.submitNewToy}  name={this.state.newToy.name} image={this.state.newToy.image} handleOnchange={this.handleOnchange} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} addlike={this.addLike} deleteToy={this.deleteToy} />
      </>
    );
  }

}

export default App;
