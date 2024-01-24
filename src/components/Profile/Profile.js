import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile(props) {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form">
        <div className="profile__input-container">
          <label className="profile__input-caption" for="name-input">Имя</label>
          <input
            className="profile__name-input"
            id="name-input"
            type="text"
            name="name"
            minlength="2"
            maxlength="30"
            required
            value={`Виталий`}>
          </input>
        </div>
        <span className="profile__input-error name-input-error"></span>
        <div className="profile__input-container">
          <label className="profile__input-caption" for="name-input">E-mail</label>
          <input
            className="profile__email-input"
            id="email-input"
            type="email"
            name="email"
            required
            value={`pochta@yandex.ru`}>
          </input>
        </div>
        <span className="profile__input-error email-input-error"></span>
        <button className="profile__edit-button" type="submit" aria-label="Редактировать">Редактировать</button>
      </form>
      <Link className="profile__exit-link" to="/signin">Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;