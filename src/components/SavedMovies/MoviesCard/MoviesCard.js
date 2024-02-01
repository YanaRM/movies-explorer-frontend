import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const duration = props.movie.duration;

  function convertHours() {
    const hours = Math.floor(duration / 60);
    return hours;
  }
  
  function convertMinutes() {
    const minutes = duration % 60;
    return minutes;
  }

  const hours = convertHours();
  const minutes = convertMinutes();

  function handleDeleteClick() {
    props.handleDeleteMovie(props.movie._id);
  }

  return (
    <div className="movies__card">
      <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <img
        className="movies__card-picture"
        src={props.movie.image}
        alt={props.movie.nameRU} />
      </a>
      <div className="movies__card-caption-container">
        <p className="movies__card-caption">{props.movie.nameRU}</p>
        <button
          className="movies__card-delete-button"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}></button>
      </div>
      <p className="movies__card-movie-duration">{`${hours}ч ${minutes}м`}</p>
    </div>
  )
}

export default MoviesCard;