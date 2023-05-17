import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Register from '../Register/Register.js'
import Login from '../Login/Login.js'
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js'
import Main from '../Main/Main.js'
import Header from '../Header/Header.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js'
import mainApi from '../../utilis/MainApi.js';
import moviesApi from '../../utilis/MoviesApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([])
  const [isShortMovies, setIsShortMovies] = useState(false)
  const [isShortMoviesSave, setIsShortMoviesSave] = useState(false);
  const [isPreloaderActive, setPreloaderActive] = useState(false);
  const [isUpdatedUser, setUpdatedUser] = useState(false);
  const [searchMessage, setSearchMessage] = useState(false)
  const localShortMovies = JSON.parse(localStorage.getItem('shortMovies'));



  const handleLogin = (data) => {
    mainApi
      .login(data.email, data.password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setToken(res.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const handleRegister = (data) => {
    mainApi
      .register(data.email, data.password, data.name)
      .then(() => {
        handleLogin(data)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const handleUpdateUser = (data) => {
    mainApi
      .editUserInfo(data.name, data.email, token)
      .then((res) => {
        setCurrentUser(res);
        setUpdatedUser(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const checkToken = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      setToken(token);
      mainApi
        .getUserInfo(token)
        .then((userData) => {
          setLoggedIn(true);
          setCurrentUser(userData)
          navigate(path)
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false)
        })
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([moviesApi.getFilms(), mainApi.getSavedMovies(token), mainApi.getUserInfo(token)])
        .then(([movies, savedMovies, userData]) => {
          localStorage.setItem('moviesAPI', JSON.stringify(movies))
          setSavedMovies(savedMovies)
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
          setCurrentUser(userData)
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])


  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/')
    setSavedMovies([])
    setFoundMovies([])
    setUpdatedUser(false)
    localStorage.removeItem('savedMovies')
    localStorage.removeItem('moviesAPI')
    localStorage.removeItem('input')
    localStorage.removeItem('shortMovies')
    localStorage.removeItem('foundMovies')
    localStorage.removeItem('isShort')
    localStorage.removeItem('isShortSave')
    localStorage.removeItem('savedShortMovies')
  }

  useEffect(() => {
    checkToken()
  }, [])


  const handleSave = (card) => {
    mainApi
      .postSaveMovie(card, token)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify([newMovie, ...savedMovies]))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleRemove = (card) => {
    const returnMovie = card._id
      ? card
      : savedMovies.find(i => i.movieId === card.id);
    mainApi
      .deleteMovie(returnMovie._id, token)
      .then(() => {
        setSavedMovies(
          savedMovies.filter(item => item._id !== returnMovie._id)
        )
      })
      .catch(err => {
        console.log(err)
      })
  }


  const handleSearchMovie = (i) => {
    setPreloaderActive(true)
    const moviesApi = JSON.parse(localStorage.getItem('moviesAPI'));
    const foundMovies = moviesApi.filter((movie) => movie.nameRU.toLocaleLowerCase().includes(i.toLocaleLowerCase()));
    const shortMovies = foundMovies.filter((movie) => movie.duration <= 40)
    localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies))

    if (isShortMovies) {
      setFoundMovies(shortMovies);
      setSearchMessage('')
    }

    if (!isShortMovies) {
      setFoundMovies(foundMovies)
      setSearchMessage('')
    }

    if (!isShortMovies && foundMovies.length === 0) {
      setSearchMessage('Ничего не найдено');
    } else if (isShortMovies && shortMovies.length === 0) {
      setSearchMessage('Ничего не найдено');
    }
    setPreloaderActive(false)
  }

  const handleSearchMovieSaved = (i) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'))
    const foundSaveMovies = savedMovies.filter((movie) => movie.nameRU.toLocaleLowerCase().includes(i.toLocaleLowerCase()))
    const savedShortMovies = foundSaveMovies.filter((movie) => movie.duration <= 40)

    localStorage.setItem('savedShortMovies', JSON.stringify(savedShortMovies))

    if (isShortMoviesSave) {
      setSavedMovies(savedShortMovies)
      setSearchMessage('')
    }

    if (!isShortMoviesSave) {
      setSavedMovies(foundSaveMovies);
      setSearchMessage('')
    }

    if (!isShortMoviesSave && foundSaveMovies.length === 0) {
      setSearchMessage('Ничего не найдено')
      setSavedMovies([])
    } else if (isShortMoviesSave && savedShortMovies.length === 0) {
      setSearchMessage('Ничего не найдено')
      setSavedMovies([])
    }

  }



  const handlerShortMovies = () => {
    if (path === '/movies') {
      const showShortMovies = !isShortMovies
      setIsShortMovies(showShortMovies)
      localStorage.setItem('isShort', JSON.stringify(showShortMovies));
    }
    if (path === '/saved-movies') {
      const showShortMoviesSave = !isShortMoviesSave
      setIsShortMoviesSave(showShortMoviesSave)
      localStorage.setItem('isShortSave', JSON.stringify(showShortMoviesSave));
    }
  }


  useEffect(() => {
    if (isShortMovies && localShortMovies) {
      setFoundMovies(localShortMovies)
    }
    else if (localStorage.getItem('foundMovies')) {
      setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')))
      setSearchMessage('')
    }
  }, [location, isShortMovies])



  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header Menu={toggleBurgerMenu} isMenuOpen={isBurgerMenuOpen} loggedIn={loggedIn} />
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path='/movies'
              element={
                <Movies
                  searchMessage={searchMessage}
                  searchMovie={handleSearchMovie}
                  cards={foundMovies}
                  handleRemove={handleRemove}
                  handleSave={handleSave}
                  savedMovies={savedMovies}
                  handlerShortMovies={handlerShortMovies}
                  shortMovies={isShortMovies}
                  isPreloaderActive={isPreloaderActive}

                />} />
            <Route path='/saved-movies'
              element={
                <SavedMovies
                  searchMessage={searchMessage}
                  searchMovie={handleSearchMovieSaved}
                  cards={savedMovies}
                  handleRemove={handleRemove}
                  handleSave={handleSave}
                  savedMovies={savedMovies}
                  handlerShortMovies={handlerShortMovies}
                  isPreloaderActive={isPreloaderActive}

                />} />
            <Route path='/profile' element={
              <Profile
                handleUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
                isUpdatedUser={isUpdatedUser}
              />} />
          </Route>
          <Route path='/signup' element={<Register loggedIn={loggedIn} handleRegister={handleRegister} />} />
          <Route path='/signin' element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App;

