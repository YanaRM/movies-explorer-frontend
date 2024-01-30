import React, { useState } from 'react';
import { FormValidation } from '../../../utils/FormValidation.js';
import './SearchForm.css';

function SearchForm(props) {
  const { values, errors, isValid, handleChange } = FormValidation();
  const [isChecked, setIsChecked] = useState(false);

  function disableSubmitButton() {
    document.querySelector('.search-form__button').disabled = true;
  }

  let isNotClearInput = false;

  function handleSubmit(e) {
    e.preventDefault();

    isNotClearInput = document.querySelector('.search-form__input-container').checkValidity();

    if (isNotClearInput === true) {
      disableSubmitButton();

      const { movie } = values;
      props.handleSearchSavedMovie(movie);

      isNotClearInput = false;
    }
  }

  function handleChangeCheckbox() {
    setIsChecked(!isChecked);
    props.handleToggleSavedMovieCheckbox(!isChecked);
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
          required
          value={values.movie || ""}
          onChange={handleChange}>
        </input>
        <span className="search-form__input-error">{errors.movie}</span>
        <button
          className="search-form__button"
          type="submit"
          aria-label="Найти"
          disabled={!isValid}>
            Найти
        </button>
      </form>
      <div className="search-form__checkbox-container">
        <input
          className="search-form__checkbox-input"
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={handleChangeCheckbox}></input>
        <label className="search-form__checkbox-button" htmlFor="checkbox"></label>
        <p className="search-form__checkbox-caption">Короткометражки</p>
      </div>
    </div>
  )
}

export default SearchForm;