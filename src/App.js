import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'
import toyData from './data';


class App extends React.Component{

  state = {
    display: false,
    toys:toyData,
    name:'',
    image: '',
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  changeHandler  = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = e => {
    e.preventDefault()
    let newToy = {
      name: this.state.name,
      image: this.state.image
    }
    this.setState({toys: [...this.state.toys, newToy]})
  }


  deleteToy = (id) => {
    let toyToRender = this.state.toys.filter(toy=> toy.id !== id)
    this.setState({toys: toyToRender})
  }

  addLikes = (id) => {
    let targetToy= this.state.toys.find(toy=> toy.id === id )
    let curLike = targetToy.likes 
    targetToy.likes = curLike + 1
    let updatedtoys = this.state.toys
    updatedtoys[id-1] = targetToy
    this.setState({toys: updatedtoys})
  }

  render(){
    console.log(this.state)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm name={this.state.name} 
          image={this.state.image}
          changeHandler={this.changeHandler}
          submitHandler={this.submitHandler}
          />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy}addLikes={this.addLikes}/>
      </>
    );
  }

}

export default App;
