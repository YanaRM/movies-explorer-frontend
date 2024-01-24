import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import './Movies.css';

function Movies(props) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
    </section>
  )
}

export default Movies;