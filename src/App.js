import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
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
          <ToyForm 
            handleNameChange={this.handleNameChange}
            handleImageChange={this.handleImageChange}
          />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toy={data}/>
      </>
    );
  }

}

export default App;

// <ToyContainer toy={data}/>
// toy is the name of the prop passed to the ToyContainer
// so now within ToyContainer we must use prop.toy to reference the data