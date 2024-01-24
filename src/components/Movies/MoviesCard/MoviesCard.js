import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <div className="movies__card">
      <img className="movies__card-picture" src={`${props.image}`} alt={props.name} />
      <div className="movies__card-caption-container">
        <p className="movies__card-caption">{props.name}</p>
        <div className="movies__card-like-button"></div>
      </div>
      <p className="movies__card-movie-duration">{props.duration}</p>
    </div>
  )
}

export default MoviesCard;