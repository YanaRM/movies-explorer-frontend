import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <div className="movies__card-list">
      <div className="movies__card-list-container">
        
        {props.filteredMovies.map((data) => (
          <MoviesCard
            movie={data}
            key={data._id || data.id}
            savedMovies={props.savedMovies}
            handleLikeClick={props.handleLikeClick}
          />
        ))}
        
      </div>
      <button className="movies__card-list-button" type="button" aria-label="Ещё">Ещё</button>
    </div>
  )
}

export default MoviesCardList;