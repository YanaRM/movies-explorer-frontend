import React from 'react';
import portfolioPicture from '../../../images/portfolio-picture.jpg';
import linkPointer from '../../../images/portfolio-links-pointer.svg';
import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Студент</h2>
      <div className="portfolio__info">
        <div className="portfolio__info-text">
          <h3 className="portfolio__student-name">Яна</h3>
          <p className="portfolio__student-profession">Студент факультета веб-разработки, 32 года</p>
          <p className="portfolio__student-story">
            Я родилась и живу в городе Нефтекамске. Не замужем, детей нет. 
            Я люблю слушать музыку, ездить на велосипеде, читать книги,
            в особенности исторические. Больше года назад решила освоить 
            профессию веб-разработчика, очень хочется заниматься этим 
            профессионально.
          </p>
          <a
            className="portfolio__github-link"
            href="https://github.com/YanaRM"
            target="_blank"
            rel="noreferrer">
              Github</a>
        </div>
        <img className="portfolio__info-picture" src={portfolioPicture} alt="Фото студента" />
      </div>
      <p className="portfolio__subtitle">Портфолио</p>
      <div className="portfolio__links">
        <a
          className="portfolio__link"
          href="https://github.com/YanaRM/how-to-learn"
          target="_blank"
          rel="noreferrer">
          Статичный сайт 
          <img className="portfolio__link-picture" src={linkPointer} alt="Стрелка" /></a>
        <a
          className="portfolio__link"
          href="https://github.com/YanaRM/russian-travel"
          target="_blank"
          rel="noreferrer">
          Адаптивный сайт 
          <img className="portfolio__link-picture" src={linkPointer} alt="Стрелка" /></a>
        <a
          className="portfolio__link"
          href="https://github.com/YanaRM/mesto"
          target="_blank"
          rel="noreferrer">
          Одностраничное приложение 
          <img className="portfolio__link-picture" src={linkPointer} alt="Стрелка" /></a>
      </div>
    </section>
  )
}

export default Portfolio;