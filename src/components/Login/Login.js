import React from 'react';
import Form from '../Form/Form.js'
import { useForm } from 'react-hook-form';
import { regExEmail } from '../../utilis/regex.js'

function Login(props) {
  const [isDataChanged, setDataChanged] = React.useState(true);

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

  function onLoginSubmit(data) {
    props.handleLogin({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    setDataChanged(true)
  }

  return (
    <Form
      title="Рады видеть!"
      linkSpan="Ещё не зарегистрированы?"
      linkName="Регистрация"
      name="login"
      buttonTitle="Войти"
      path="/signup"

      isValid={isValid}
      isDataChanged={isDataChanged}
      onHandleSubmit={handleSubmit(onLoginSubmit)}
    >

      <div className='form__input-container'>
        <label htmlFor='register-email' className='form__label'>E-mail
          <input
            className='form__input register__email'
            type='email'
            name='email'
            id='register-email'
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
          <input
            className="form__input register__password"
            type='password'
            name='password'
            id='register-password'
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

export default Login;