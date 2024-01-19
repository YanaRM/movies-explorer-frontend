import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound(props) {
  const navigate = useNavigate();

  function navigateBack() {
    navigate(-1);
  }

  return (
    <section className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      {/* <Link className="page-not-found__link" to="/">Назад</Link> */}
      <button
        className="page-not-found__link"
        type="button"
        onClick={navigateBack}
        aria-label="Назад">
        Назад
      </button>
    </section>
  )
}

export default PageNotFound;