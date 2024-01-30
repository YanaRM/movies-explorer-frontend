import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {

  const isSaved = props.savedMovies.find(i => i.movieId === props.movie.id);
  const likeButtonClassName = (
    `movies__card-like-button ${isSaved && 'movies__card-like-button_active'}`)

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

  function handleLikeClick() {
    if (!isSaved) {
      props.handleLikeClick(props.movie);
    } else {
      return;
    }
  };

  return (
    <div className="movies__card">
      <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies__card-picture" src={`https://api.nomoreparties.co/${props.movie.image.url}`}
          alt={props.movie.nameRU} />
      </a>
      <div className="movies__card-caption-container">
        <p className="movies__card-caption">{props.movie.nameRU}</p>
        <button
          className={likeButtonClassName}
          type="button"
          aria-label="Сохранить"
          onClick={handleLikeClick}></button>
      </div>
      <p className="movies__card-movie-duration">{`${hours}ч ${minutes}м`}</p>
    </div>
  )
}

export default MoviesCard;