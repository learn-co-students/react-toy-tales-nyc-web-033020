import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy => <ToyCard key={toy.id} {...toy} addlike={props.addlike} deleteToy={props.deleteToy} />)}
    </div>
  );
}

export default ToyContainer;
