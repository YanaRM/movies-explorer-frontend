import React from 'react';
import SearchForm from '../SavedMovies/SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <section className="saved-movies">
      <SearchForm
        handleSearchSavedMovie={props.handleSearchSavedMovie}
        handleToggleSavedMovieCheckbox={props.handleToggleSavedMovieCheckbox}
        searchSavedMovieErrorMessage={props.searchSavedMovieErrorMessage} />

      <p className="saved-movies__search-message">{props.savedMoviesErrorMessage}</p>

      {props.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          filteredSavedMovies={props.filteredSavedMovies}
          savedMovies={props.savedMovies}
          handleDeleteMovie={props.handleDeleteMovie}
          isSavedMovieFound={props.isSavedMovieFound}
          savedMoviesErrorMessage={props.savedMoviesErrorMessage}
        />
      )}

    </section>
  )
}

export default SavedMovies;