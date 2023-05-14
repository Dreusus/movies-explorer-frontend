import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { regExName, regExEmail } from '../../utilis/regex'

function Profile({
  handleUpdateUser,
  handleLogout,
  isUpdatedUser,

}) {

  const currentUser = useContext(CurrentUserContext);

  const [isDataChanged, setDataChanged] = useState(true);
  const [isCurrentValue, setCurrentValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  })


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onUpdateSubmit = (data) => {
    handleUpdateUser({
      name: data.name,
      email: data.email,
    });
    setDataChanged(true)
  }

  const onDataChange = (e) => {
    const newCurrentValue = {
      ...isCurrentValue,
      [e.target.name]: e.target.value,
    };
    setCurrentValue(newCurrentValue)
  }

  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет,{currentUser.name}!</h1>
          <form className="profile__form" name="profile" id="profile" onSubmit={handleSubmit(onUpdateSubmit)}>
            <div className="profile__field">
              <label htmlFor="profile-name" className="profile__label">Имя</label>
              <input
                className="profile__input profile__name"
                type="text"
                name="name"
                id="profile-name"
                {...register('name', {
                  onChange: (e) => {
                    onDataChange(e);
                    setDataChanged(false);
                  },
                  value: currentUser.name,
                  required: 'Поле обязательно для заполнения',
                  minLength: {
                    value: 2,
                    message: 'Минимальное количество символов: 2',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Максимальное количество символов: 30',
                  },
                  pattern: {
                    value: regExName,
                    message:
                      'Имя должно содержать только латиницу, кириллицу, пробел или дефис',
                  },
                })}
              />

              {errors.name && (
                <span className="profile__input-error">
                  {errors.name.message}
                </span>
              )}


            </div>
            <div className="profile__field">
              <label htmlFor="profile-email" className="profile__label">E-mail</label>
              <input
                className="profile__input profile__email"
                type="email"
                name="email"
                id="profile-name"
                {...register('email', {
                  onChange: (e) => {
                    onDataChange(e);
                    setDataChanged(false);
                  },
                  value: currentUser.email,
                  required: 'Поле обязательно для заполнения',
                  pattern: {
                    value: regExEmail,
                    message: 'Введите корректную почту',
                  },
                })}
              />
              {errors.email && (
                <span className='profile__input-error'>
                  {errors.email.message}
                </span>
              )}
              <span className={`profile__form-message ${isUpdatedUser && `profile__form-message_active`
                }`}>
                Данные обновлены
              </span>
            </div>


          </form>
          <div className='profile__button-container'>
            <button className="profile__update-button active-element" type="submit" form="profile">Редактировать </button>
            <button
              className="profile__logout-button active-element"
              type="button"
              onClick={handleLogout}
            >Выйти из аккаунта
            </button>
          </div>
        </div>
      </section>
    </>
  )

}

export default Profile;

