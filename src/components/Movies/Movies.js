
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';



function Movies({
  searchMovie,
  cards,
  handleSave,
  handleRemove,
  savedMovies,
  handlerShortMovies,
  isPreloaderActive,
  searchMessage
}) {


  return (
    <>
      <div className="section__movies">
        <SearchForm
          searchMovie={searchMovie}
          handlerShortMovies={handlerShortMovies}
          isPreloaderActive={isPreloaderActive}
          searchMessage={searchMessage}
        />
        <MoviesCardList
          cards={cards}
          handleSave={handleSave}
          handleRemove={handleRemove}
          savedMovies={savedMovies}
        />

      </div>
      <Footer />
    </>

  )
}

export default Movies;