import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Register from '../Register/Register.js'
import Login from '../Login/Login.js'
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js'
import Main from '../Main/Main.js'
import NotFoundPage from '../NotFoundPage/NotFoundPage.js'
import Header from '../Header/Header.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js'

function App() {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  function toggleBurgerMenu() {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <>
    
     {/*  <Header Menu={toggleBurgerMenu} isMenuOpen={isBurgerMenuOpen} loggedIn={!loggedIn} /> */}           {/*  костыль для верстки */}

      <Routes>
        <Route exact path='/' element={<Main />} />

        <Route element={<ProtectedRoute loggedIn={!loggedIn} />}>
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App;