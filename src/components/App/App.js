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
  const history = useNavigate();
  const path = location.pathname;

  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([])
  const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem('isShort')) || false)
  const [isShortMoviesSave, setIsShortMoviesSave] = useState(JSON.parse(localStorage.getItem('isShortSave')) || false);
  const [isPreloaderActive, setPreloaderActive] = useState(false);
  const [searchMessage, setSearchMessage] = useState(false)
  const localShortMovies = JSON.parse(localStorage.getItem('shortMovies'));


  const handleLogin = (data) => {
    mainApi
      .login(data.email, data.password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setToken(res.token);
        setLoggedIn(true);
        history('/movies');
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
          history(path)
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false)
        })
    }
  }

  useEffect(() => {
    if (loggedIn) {
      moviesApi
        .getFilms()
        .then((movies) => {
          localStorage.setItem('moviesAPI', JSON.stringify(movies))
        })
        .catch((err) => {
          console.log(err)
        })
      mainApi
        .getSavedMovies(token)
        .then(data => {
          setSavedMovies(data)
          localStorage.setItem('savedMovies', JSON.stringify(data))
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])


  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history('/')
    setSavedMovies([])
    setFoundMovies([])
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


  const handleSaveMovie = (card) => {
    mainApi
      .postSaveMovie(card, token)
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify([newMovie, ...savedMovies]))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleRemoveMovie = (card) => {
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
    console.log('savedMovies', savedMovies)
    const foundMovies = savedMovies.filter((movie) => movie.nameRU.toLocaleLowerCase().includes(i.toLocaleLowerCase()))
    console.log('foundMov', foundMovies)
    console.log('foundMOvLENGTH', foundMovies.length)
    const savedShortMovies = foundMovies.filter((movie) => movie.duration <= 40)
    console.log('savedShort', savedShortMovies)
    localStorage.setItem('savedShortMovies', JSON.stringify(savedShortMovies))
    console.log(isShortMoviesSave)
    if (foundMovies.length === 0) {
      setSearchMessage('Ничего не найдено')
      setSavedMovies([])
    }

    if (isShortMoviesSave && JSON.parse(localStorage.getItem('savedShortMovies')).length === 0) {
      setSearchMessage('Ничего не найдено')
      setSavedMovies([])
    }

    if (isShortMoviesSave) {
      setSavedMovies(savedShortMovies)
    } else {
      setSavedMovies(foundMovies);
    }
  }

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }



  useEffect(() => {
    if (isShortMovies && localShortMovies) {
      setFoundMovies(localShortMovies)
    }
    else if (localStorage.getItem('foundMovies')) {
      setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')))
      setSearchMessage('')
    }

    if (JSON.parse(localStorage.getItem('savedMovies'))) {
      setIsShortMoviesSave(false)
      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')))
      setSearchMessage('')
    }

  }, [location, isShortMovies])

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
                  savedMovies={savedMovies}
                  handleSave={handleSaveMovie}
                  handleRemove={handleRemoveMovie}
                  handlerShortMovies={handlerShortMovies}
                  shortMovies={isShortMovies}
                  isPreloaderActive={isPreloaderActive}
                />} />
            <Route path='/saved-movies'
              element={
                <SavedMovies
                  searchMessage={searchMessage}
                  cards={savedMovies}
                  handleRemove={handleRemoveMovie}
                  handleSave={handleSaveMovie}
                  searchMovie={handleSearchMovieSaved}
                  savedMovies={savedMovies}
                  handlerShortMovies={handlerShortMovies}
                  isPreloaderActive={isPreloaderActive}
                />} />
            <Route path='/profile' element={
              <Profile
                onUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
              />} />
          </Route>
          <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
          <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App;

