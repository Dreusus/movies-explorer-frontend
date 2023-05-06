function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio-items">
        <li className="portfolio-item">
          <a
            href="https://github.com/Dreusus/how-to-learn"
            target="_blank"
            className="portfolio-item__text"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <a
            href="https://github.com/Dreusus/how-to-learn"
            target="_blank"
            className="portfolio-item__icon"
            rel="noreferrer"
          >
          </a>
        </li>
        <li className="portfolio-item">
          <a
            href="https://dreusus.github.io/russian-travel/"
            target="_blank"
            className="portfolio-item__text"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <a
            href="https://dreusus.github.io/russian-travel/"
            target="_blank"
            className="portfolio-item__icon"
            rel="noreferrer"
          >

          </a>
        </li>
        <li className="portfolio-item">
          <a
            href="https://dreusus.nomoredomains.work/"
            target="_blank"
            className="portfolio-item__text"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <a
            href="https://dreusus.nomoredomains.work/"
            target="_blank"
            rel="noreferrer"
            className="portfolio-item__icon"
          >

          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
