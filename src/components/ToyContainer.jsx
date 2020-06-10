import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {props.allToys.map(toy => {
        return <ToyCard key={toy.id} {...toy} handleDeleteToy={props.handleDeleteToy}/>
      })}
    </div>
  );
}

export default ToyContainer;
