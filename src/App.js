import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'
// import toyData from './data';

// const jsonPOST = require('json-post');
class App extends React.Component{

  state = {
    display: false,
    toys:[],
    name:'',
    image: '',
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(r=>r.json())
    .then(data=> this.setState({toys:data}))
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
      image: this.state.image,
      likes:0 
    }
    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify(newToy)
    })
    .then(r=>r.json())
    .then(data=>{
    this.setState({toys: [...this.state.toys,data]}) 
    this.setState({name:'',image:''})
    })
  }


  deleteToy = (id) => {
    let updatedToys= [...this.state.toys]
    this.setState({ toys: updatedToys.filter(toy => toy.id !== id)})
    fetch(`http://localhost:3000/toys/${id}`,{
      method: "DELETE",      
    })
  

  }

  addLikes = (id,likes) => {
    let newLikes = likes + 1
    fetch(`http://localhost:3000/toys/${id}`,{
      method:"PATCH",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({likes:newLikes})
      })
      .then(r=>r.json())
      .then(data=>{    
        let target = this.state.toys.find(toy=> toy.id === id)
        let index = this.state.toys.indexOf(target)
        let updatedToys = [...this.state.toys]
        updatedToys[index] = data
        this.setState({toys: updatedToys})

      })
  }

  render(){

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
