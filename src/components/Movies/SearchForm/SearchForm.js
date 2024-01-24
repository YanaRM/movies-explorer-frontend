import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  return (
    <div className="search-form">
      <form className="search-form__input-container">
        <input
          className="search-form__input"
          id="search-form-input"
          type="text"
          name="movie"
          placeholder="Фильм"
          required>
        </input>
        <button
          className="search-form__button"
          type="submit"
          aria-label="Найти">
            Найти
        </button>
      </form>
      <div className="search-form__checkbox-container">
        <input className="search-form__checkbox-input" type="checkbox" id="checkbox"></input>
        <label className="search-form__checkbox-button" for="checkbox"></label>
        <p className="search-form__checkbox-caption">Короткометражки</p>
      </div>
    </div>
  )
}

export default SearchForm;