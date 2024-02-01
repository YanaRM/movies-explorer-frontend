import React, { useEffect, useState } from 'react';
import { FormValidation } from '../../../utils/FormValidation.js';
import './SearchForm.css';

function SearchForm(props) {
  const { values, errors, isValid, handleChange, setValues } = FormValidation();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setValues({
      movie: localStorage.getItem('inputData')
    })
  }, [setValues])

  useEffect(() => {
    setIsChecked(JSON.parse(localStorage.getItem('checkbox')))
  }, [setIsChecked])

  function disableSubmitButton() {
    document.querySelector('.search-form__button').disabled = true;
  }

  let isClearInput = false;

  function handleSubmit(e) {
    e.preventDefault();

    isClearInput = document.querySelector('.search-form__input-container').checkValidity();

    if (isClearInput === true) {
      disableSubmitButton();

      const { movie } = values;
      props.handleSearchMovie(movie, isChecked);

      isClearInput = false;
    }

    document.querySelector('.search-form__button').disabled = false;
  }

  function handleChangeCheckbox() {
    setIsChecked(!isChecked);
    props.handleToggleMovieCheckbox(!isChecked);
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