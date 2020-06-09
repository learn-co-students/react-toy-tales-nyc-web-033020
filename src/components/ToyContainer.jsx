import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  console.log(props)
  return(
    <div id="toy-collection">
      {props.toy.map(toy =>  <ToyCard key={toy.id} {...toy} /> )}
    </div>
  );
}

export default ToyContainer;
