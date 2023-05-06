import React from 'react';

function Footer() {
  return (
    <footer className="footer">

      <div className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </div>

      <div className="footer__container">
        <div className="footer__copy">&#169; 2023</div>
        <ul className="footer__socials">
          <li><a className="footer__social" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
          <li><a className="footer__social" href="https://github.com/Dreusus">Github</a></li>
        </ul>
      </div>

    </footer>
  )
}

export default Footer