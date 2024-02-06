import React from 'react';
import { Link } from 'react-router-dom';
import logoPicture from '../../images/logo-picture.svg';
import { FormValidation } from '../../utils/FormValidation.js';
import { EMAIL_REGULAR_EXPRESSION } from '../../utils/constants.js';
import './Login.css';

function Login(props) {
  const { values, errors, isValid, handleChange } = FormValidation();

  function disableSubmitButton() {
    document.querySelector('.login__submit-button').disabled = true;
  }

  let isNotClearInput = false;

  function handleSubmit(e) {
    e.preventDefault();

    isNotClearInput = document.querySelector('.login__form').checkValidity();

    if (isNotClearInput === true) {
      disableSubmitButton();

      const { email, password } = values;
      props.handleLogin({ email, password });

      isNotClearInput = false;
    }

    document.querySelector('.login__submit-button').disabled = false;
  }

  return (
    <section className="login">
      <Link className="login__logo-link" to="/">
        <img className="register__logo-picture" src={logoPicture} alt="Логотип" />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" name="login" onSubmit={handleSubmit} isValid={isValid}>
        <div className="login__input-container">
          <label className="login__input-caption">E-mail</label>
          <input
          className="login__email-input"
          id="email-input"
          type="email"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
          pattern={EMAIL_REGULAR_EXPRESSION}
          required
          disabled={props.isInputDisabled}>
          </input>
          <span className="login__input-error email-input-error">{errors.email}</span>
        </div>
        <div className="login__input-container">
          <label className="login__input-caption">Пароль</label>
          <input
            className="login__password-input"
            id="password-input"
            type="password"
            name="password"
            minLength="8"
            value={values.password || ''}
            onChange={handleChange}
            required
            disabled={props.isInputDisabled}>
          </input>
          <span className="login__input-error password-input-error">{props.loginErrorMessage || errors.password}</span>
        </div>
        <button
          className={`login__submit-button ${isValid ? '' : 'login__submit-button_disabled'}`}
          type="submit"
          aria-label="Войти"
          disabled={!isValid}>
            Войти
        </button>
      </form>
      <p className="login__caption">Ещё не зарегистрированы? 
        <Link className="login__register-link" to="/signup">Регистрация</Link>
      </p>
    </section>
  )
}

export default Login;