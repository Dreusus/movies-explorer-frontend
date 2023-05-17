import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';

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
    if (innerWidth > 1800) {
      setCounter(12);
      setMoreMovies(4);
    }
    else if (innerWidth >= 1280) {
      setCounter(12);
      setMoreMovies(3);
    }
    else if (innerWidth >= 760) {
      setCounter(8);
      setMoreMovies(2);
    }
    else if (innerWidth < 480) {
      setCounter(5);
      setMoreMovies(1);
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


