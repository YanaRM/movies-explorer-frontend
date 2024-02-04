import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import './Movies.css';

function Movies(props) {
  return (
    <section className="movies">
      <SearchForm
        handleSearchMovie={props.handleSearchMovie}
        handleToggleMovieCheckbox={props.handleToggleMovieCheckbox}
        searchMovieErrorMessage={props.searchMovieErrorMessage} />
      <p className="movies__search-message">{props.moviesErrorMessage}</p>

      {props.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          filteredMovies={props.filteredMovies}
          savedMovies={props.savedMovies}
          handleLikeClick={props.handleLikeClick}
          handleDeleteMovie={props.handleDeleteMovie} />
      )}

    </section>
  )
}

export default Movies;