import React from 'react';

function MoviesCard(props) {
  return (
    <div className="movies__card">
      <img className="movies__card-picture" src={} alt="" />
      <div className="movies__card-caption-container">
        <p className="movies__card-caption"></p>
        <div className="movies__card-like-button"></div>
      </div>
      <p className="movies__card-movie-duration"></p>
    </div>
  )
}

export default MoviesCard;