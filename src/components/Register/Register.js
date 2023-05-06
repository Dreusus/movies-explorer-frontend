import React from 'react';
import Form from '../Form/Form.js'
import { useForm } from 'react-hook-form';
import { regExEmail } from '../../utilis/regex.js'

function Register(props) {
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
      title="Добро пожаловать!"
      name="register"
      buttonTitle="Зарегистрироваться"
      linkSpan="Уже зарегистрированы?"
      linkName="Войти"
      path="/signin"
      isValid={isValid}
      isDataChanged={isDataChanged}
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
