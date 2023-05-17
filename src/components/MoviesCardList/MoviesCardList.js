import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { X_LARGE_SCREEN, LARGE_SCREEN, MEDIUM_SCREEN, SMALL_SCREEN } from '../../utilis/constants.js';

console.log(X_LARGE_SCREEN)
console.log(LARGE_SCREEN)
console.log(MEDIUM_SCREEN)
console.log(SMALL_SCREEN)
function MoviesCardList({
  cards,
  handleSave,
  handleRemove,
  savedMovies,

}) {
  const location = useLocation();
  const path = location.pathname;



  const [routeSaveMovies, setRouteSaveMovies] = useState(false)
  const [moreMovies, setMoreMovies] = useState(0)
  const [counter, setCounter] = useState(0);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const handleWindowResize = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    if (innerWidth > X_LARGE_SCREEN.WIDTH) {
      setCounter(X_LARGE_SCREEN.CARDS);
      setMoreMovies(X_LARGE_SCREEN.ADD);
    }
    else if (innerWidth >= LARGE_SCREEN.WIDTH) {
      setCounter(LARGE_SCREEN.CARDS);
      setMoreMovies(LARGE_SCREEN.ADD);
    }
    else if (innerWidth >= MEDIUM_SCREEN.WIDTH) {
      setCounter(MEDIUM_SCREEN.CARDS);
      setMoreMovies(MEDIUM_SCREEN.ADD);
    }
    else if (innerWidth < SMALL_SCREEN.WIDTH) {
      setCounter(SMALL_SCREEN.CARDS);
      setMoreMovies(SMALL_SCREEN.ADD);
    }


  }, [innerWidth])






  useEffect(() => {
    path === '/saved-movies' ? setRouteSaveMovies(true) : setRouteSaveMovies(false)
  }, [])


  const handleShowMovies = () => {
    setCounter(counter + moreMovies);
  }

  const button = !routeSaveMovies ?
    <button
      className={!(cards.length < counter + 1) ? `movies__load-button` : `movies__load-button movies__load-button_hidden`}
      onClick={handleShowMovies}>Ещё</button> : ''
  const end = !routeSaveMovies ? counter : cards.length


  return (
    <section className='movies__container'>
      <ul className='movies'>
        {cards.slice(0, end).map((card) => {
          return <MoviesCard
            key={card.id || card._id}
            card={card}
            handleSave={handleSave}
            handleRemove={handleRemove}
            savedMovies={savedMovies}
            routeSaveMovies={routeSaveMovies}

          />
        })}
      </ul>
      {button}
    </section>

  )
}
export default MoviesCardList;


