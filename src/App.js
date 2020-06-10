import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

// import data from "./data";
const baseUrl = "http://localhost:3000/toys/";

class App extends React.Component {
  state = {
    display: false,
    toys: [],
    newToy: {
      name: "",
      image: "",
    },
  };

  componentDidMount() {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((json) => this.setState({ toys: json }));
  }

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  handleForm = (event) => {
    const target = event.target;
    const form = this.state.newToy;
    form[target.name] = target.value;
    this.setState({ toyForm: form });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // this.setState({ toys: [this.state.newToy, ...this.state.toys] });
    this.postToy();
  };

  postToy = () => {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.newToy),
    })
      .then((res) => res.json())
      .then((toy) => this.setState({ toys: [toy, ...this.state.toys] }));
  };

  render() {
    return (
      <>
        <Header />
        {this.state.display ? (
          <ToyForm
            newToy={this.state.newToy}
            handleForm={this.handleForm}
            handleSubmit={this.handleSubmit}
          />
        ) : null}

        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} />
      </>
    );
  }
}

export default App;
