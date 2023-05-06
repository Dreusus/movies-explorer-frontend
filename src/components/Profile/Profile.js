import React from 'react';

function Profile(props) {
  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form" name="profile" id="profile">
            <div className="profile__field">
              <label htmlFor="profile-name" className="profile__label">Имя</label>
              <input className="profile__input profile__name" type="text" name="name" id="profile-name" />Виталий
            </div>
            <div className="profile__field">
              <label htmlFor="profile-email" className="profile__label">E-mail</label>
              <input className="profile__input profile__email" type="email" name="email" id="profile-name" />pochta@yandex.ru
            </div>
          </form>
          <div className='profile__button-container'>
            <button className="profile__update-button" type="submit" form="profile">Редактировать </button>
            <button className="profile__logout-button" type="button">Выйти из аккаунта</button>
          </div>
        </div>
      </section>
    </>
  )

}

export default Profile;