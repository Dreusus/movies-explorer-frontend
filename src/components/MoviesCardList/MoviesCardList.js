import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {
  return (
    <section className='movies__container'>
      <ul className='movies'>
        <MoviesCard isLiked={true} />
        <MoviesCard isLiked={false} />
        <MoviesCard isLiked={true} />
        <MoviesCard isLiked={false} />
        <MoviesCard isLiked={true} />
        <MoviesCard isLiked={false} />
        <MoviesCard isLiked={true} />
        <MoviesCard isLiked={false} />
  
      </ul>
      <button className={`movies__load-button ${props.isHidden && 'movies__load-button_hidden'}`} type='button'>Еще</button>
    </section>
  )
}
export default MoviesCardList;
