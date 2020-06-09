import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{

  state = {
    toys: [],
    display: false,
  }


  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  fetchAllToys = () => {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      this.setState({toys})
    })
  }
  

  componentDidMount(){
    this.fetchAllToys()
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm 
            reRender = {this.fetchAllToys}
          />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toy={this.state.toys} reRender = {this.fetchAllToys}/>
      </>
    );
  }

}

export default App;

// <ToyContainer toy={data}/>
// toy is the name of the prop passed to the ToyContainer
// so now within ToyContainer we must use prop.toy to reference the data