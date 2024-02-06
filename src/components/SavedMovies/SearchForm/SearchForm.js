import React, { useEffect, useState } from 'react';
import { SEARCH_INPUT_ERROR } from '../../../utils/constants.js';
import './SearchForm.css';

function SearchForm(props) {
  const [inputValue, setInputValue] = useState('');
  const [searchError, setSearchError] = useState({
      errorMessage: "",
      isValid: true
    });

  function handleChange(evt) {
    setInputValue(evt.target.value);

    if (evt.target.value.length === 0) {
      setSearchError({
        isValid: evt.target.validity.valid,
        errorMessage: SEARCH_INPUT_ERROR
      });
    } else {
      setSearchError({
        isValid: evt.target.validity.valid,
        errorMessage: ''
      });
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!inputValue) {
      return setSearchError({
        isValid: false,
        errorMessage: SEARCH_INPUT_ERROR
      });
    }

    props.handleSearchSavedMovie(inputValue);
  }

  return (
    <div className="search-form">
      <form className="search-form__input-container" name="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          id="search-form-input"
          type="text"
          name="movie"
          placeholder="Фильм"
          value={inputValue || ""}
          onChange={handleChange}>
        </input>
        {<span className="search-form__input-error">
          {searchError.errorMessage || props.searchSavedMovieErrorMessage}
        </span>}
        <button
          className="search-form__button"
          type="submit"
          aria-label="Найти">
            Найти
        </button>
      </form>
      <div className="search-form__checkbox-container">
        <input
          className="search-form__checkbox-input"
          type="checkbox"
          id="checkbox"
          checked={props.isChecked}
          onChange={props.handleToggleSavedMovieCheckbox}></input>
        <label className="search-form__checkbox-button" htmlFor="checkbox"></label>
        <p className="search-form__checkbox-caption">Короткометражки</p>
      </div>
    </div>
  )
}

export default SearchForm;