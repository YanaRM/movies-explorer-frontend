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
        handleToggleSavedMovieCheckbox={props.handleToggleSavedMovieCheckbox} />

      {props.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
        filteredSavedMovies={props.filteredSavedMovies}
        savedMovies={props.savedMovies}
        handleDeleteMovie={props.handleDeleteMovie}
        isSavedMovieFound={props.isSavedMovieFound}
      />
      )}
        <p className="movies__search-message">{props.errorMessage}</p>

    </section>
  )
}

export default SavedMovies;