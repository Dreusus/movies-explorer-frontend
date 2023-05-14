import { useEffect, useState } from 'react';
import Form from '../Form/Form.js'
import { useForm } from 'react-hook-form';
import { regExEmail } from '../../utilis/regex.js'
import { useNavigate } from "react-router-dom";

function Register({
  loggedIn,
  handleRegister
}) {

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  })

  const [isDataChanged, setDataChanged] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    mode: 'onChange',
  });

  const onRegisterSubmit = (data) => {
    handleRegister({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    setDataChanged(true);
  }

  return (
    <Form
      title="Добро пожаловать!"
      buttonTitle="Зарегистрироваться"
      linkSpan="Уже зарегистрированы?"
      name="register"
      linkName="Войти"
      path="/signin"

      isValid={isValid}
      isDataChanged={isDataChanged}
      onHandleSubmit={handleSubmit(onRegisterSubmit)}
    >

      <div className='form__input-container'>
        <label htmlFor='register-name' className='form__label'>Имя
          <input type='text' name='name' id='register-name' className='form__input'  {...register('name', {
            required: 'Поле обязательно для заполнения',
            onChange: () => {
              setDataChanged(false);
            },
            minLength: {
              value: 2,
              message: 'Минимальное количество символов: 2',
            }
          })} />
          {errors.name && (
            <span className="form-error">{errors.name.message}</span>
          )}
        </label>
      </div>

      <div className='form__input-container'>
        <label htmlFor='register-email' className='form__label'>E-mail
          <input type='email' name='email' id='register-email' className='form__input register__email'
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              onChange: () => {
                setDataChanged(false);
              },
              pattern: {
                value: regExEmail,
                message: 'Введите корректную почту',
              },
            })} />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </label>
      </div>

      <div className='form__input-container'>
        <label htmlFor='register-password' className='form__label'>Пароль
          <input type='password' name='password' id='register-password' className="form__input register__password"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
              onChange: () => {
                setDataChanged(false);
              },
              minLength: {
                value: 6,
                message: 'Минимальное количество символов: 6',
              },
            })}
          />
          {errors.password && (
            <span className="auth__input-error">{errors.password.message}</span>
          )}
        </label>
      </div>

    </Form>
  )

}
export default Register;
