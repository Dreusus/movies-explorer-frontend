import { useLocation } from 'react-router-dom';

function MoviesCard({
  card,
  handleSave,
  handleRemove,
  savedMovies,

}) {

  const location = useLocation();
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? hours + 'ч ' + minutes + 'м' : minutes + 'м'
  }
  const formatLink = (link) => {
    return `https://api.nomoreparties.co/${link}`
  }

  let link = formatLink(card.image.url)
  let duration = formatDuration(card.duration)

  
  



  const likedMovie = (card) => savedMovies.some(item => item.movieId === card.id);

  const toggleStateLike = () => {
    likedMovie(card) ? handleRemove(card) : handleSave(card);
  }

  const deleteMovie = () => handleRemove(card); 

  return (
    <>
      {location.pathname === '/movies' ? (
        <li className='movie'>
          <a target="_blank" href={card.trailerLink} rel="noreferrer">
            <img className="movie__image"
              alt={card.nameRU}
              src={link} />
          </a>

          <div className="movie__container">
            <div className="movie__info">
              <div className="movie__title">{card.nameRU}</div>
              <button
                className={
                  likedMovie(card)
                    ? 'movie__icon movie__like movie__like_active'
                    : 'movie__icon movie__like'
                }
                type="button"
                onClick={toggleStateLike}
              />
            </div>
            <div className="movie__duration">{duration}</div>
          </div>
        </li>
      )
        :
        (
          <li className='movie'>
            <a target="_blank" href={card.trailerLink} rel="noreferrer">
              <img className="movie__image" alt={card.nameRU} src={card.image} />
            </a>

            <div className="movie__container">
              <div className="movie__info">
                <div className="movie__title">{card.nameRU}</div>
                <button
                  className='movie__icon movie__remove'
                  type="button"
                  onClick={deleteMovie}
                />
              </div>
              <div className="movie__duration">{duration}</div>
            </div>
          </li>
        )}

    </>
  )
}



export default MoviesCard;
