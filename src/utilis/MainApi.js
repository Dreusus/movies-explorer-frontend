class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.statusText}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  login(email, password) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
  }

  register(email, password, name) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name })
    })
  }

  getUserInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  editUserInfo(name, email, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
      })
    })
  }
 //сохраненные 
  getSavedMovies(token) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
  }

  postSaveMovie(card, token) {
    const { country, director, duration, year, description, trailerLink, thumbnail, id, nameRU, nameEN } = card;
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        trailerLink,
        thumbnail: thumbnail || `https://api.nomoreparties.co${card.image.url}`,
        movieId: id,
        nameRU,
        nameEN,
        image: `https://api.nomoreparties.co${card.image.url}`
      })
    })
  }

  deleteMovie(id, token) {
    return this._request(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
  }

}

const mainApi = new MainApi({
  baseUrl: "http://localhost:3000",
});

export default mainApi;

