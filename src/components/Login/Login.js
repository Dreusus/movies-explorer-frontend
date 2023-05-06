import React from 'react';
import Form from '../Form/Form.js'
import { useForm } from 'react-hook-form';
import { regExEmail } from '../../utilis/regex.js'

function Login() {
  const [isDataChanged, setDataChanged] = React.useState(true);
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    mode: 'onChange',
  });
  return (
    <Form
      title="Рады видеть!"
      name="login"
      buttonTitle="Войти"
      linkSpan="Ещё не зарегистрированы?"
      linkName="Регистрация"
      path="/signup"
      isValid={isValid}
      isDataChanged={isDataChanged}
    >

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

export default Login;