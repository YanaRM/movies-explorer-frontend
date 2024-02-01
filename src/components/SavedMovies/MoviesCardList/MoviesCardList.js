import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <div className="movies__card-list">
      <div className="movies__card-list-container">

        {props.isSavedMoviesNotEmpty ? (
          props.savedMovies.map((data) => (
          <MoviesCard
            movie={data}
            key={data._id || data.id}
            handleDeleteMovie={props.handleDeleteMovie}
          />
        ))
        ) : props.isSavedMovieFound ? (
          props.filteredSavedMovies.map((data) => (
            <MoviesCard
              movie={data}
              key={data._id || data.id}
              handleDeleteMovie={props.handleDeleteMovie}
            />
          ))
        ) : (
          <p className="movies__search-message">{props.savedMoviesErrorMessage}</p>
        )}

      </div>
    </div>
  )
}

export default MoviesCardList;