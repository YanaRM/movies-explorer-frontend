import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

import moviesArray from '../../../utils/moviesArray.js';

function MoviesCardList(props) {
  return (
    <div className="movies__card-list">
      <div className="movies__card-list-container">
        {moviesArray.map((data) => (
          <MoviesCard
            name={data.name}
            image={data.image}
            duration={data.duration}
            key={data._id}
          />
        ))}
      </div>
      <button className="movies__card-list-button" type="button" aria-label="Ещё">Ещё</button>
    </div>
  )
}

export default MoviesCardList;