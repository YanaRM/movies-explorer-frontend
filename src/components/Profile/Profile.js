import React from 'react';
import { Link } from 'react-router-dom';

function Profile(props) {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, </h2>
      <form className="profile__form">
        <label className="profile__input-caption" for="name-input">Имя</label>
        <input
          className="profile__name-input"
          id="name-input"
          type="text"
          name="name"
          minlength="2"
          maxlength="30"
          required
          ></input>
        <label className="profile__input-caption" for="name-input">E-mail</label>
        <input
          className="profile__email-input"
          id="email-input"
          type="email"
          name="email"
          required
          ></input>
        <button className="profile__edit-button" type="submit" aria-label="Редактировать">Редактировать</button>
      </form>
      <Link className="profile__exit-button" to="">Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;