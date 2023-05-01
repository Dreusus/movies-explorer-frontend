function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="section-title">Студент</h2>
      <hr className="project__hr-line"/>
      <div className="about-me__info">
        <div className="about-me__text">
          <h3 className="about-me__name">Андрей</h3>
          <h4 className="about-me__job">Фронтенд-разработчик, 24 года</h4>
          <p className="about-me__description">
            Я родился в Беларусии, живу в Санкт-Петербурге, закончил Лечебный факультет СЗГМУ.
            После окончания университета решил уйти из медицины и развиваться в области
            IT. Люблю кодить и решать задачки.А еще кота и красную икру.
          </p>
              <a
                href="https://github.com/Dreusus"
                target="_blank"
                className="contact-item"
                rel="noreferrer"
              >
                Github
              </a>
        </div>
        <img
          alt="Фото студента"
          className="about-me__image"
          src="https://i.ibb.co/Mh4yjLJ/image.png"
        ></img>
      </div>
    </section>
  );
}
export default AboutMe;
