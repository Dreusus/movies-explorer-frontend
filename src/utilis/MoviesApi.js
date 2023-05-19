class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.statusText}`)
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  };

  getFilms() {
    return this._request(`${this._baseUrl}`, {
      headers: {
        'Content-type': 'application/json',
      }
    })
  } 
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;
