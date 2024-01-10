import React from 'react';

function SearchForm(props) {
  return (
    <div className="search-form__container">
      <form className="search-form">
        <input
          className="search-form__input"
          id="search-form-input"
          type="text"
          name="movie"
          placeholder="Фильм"
          required
          ></input>
        <button
          className="search-form__button"
          type="submit"
          aria-label="Найти">
            Найти
        </button>
      </form>
      <label className="search-form__checkbox" for="checkbox">
        <input className="search-form__checkbox-input" type="checkbox" id="checkbox"></input>
        <span className="search-form__checkbox-button">Короткометражки</span>
      </label>
    </div>
  )
}

export default SearchForm;