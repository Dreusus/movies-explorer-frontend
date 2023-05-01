import React from 'react';
import { Link } from 'react-router-dom';

function Form(props) {
  return (
    <div className='form'>
      <div className='form__container'>
        <Link to='/' className='form__logo'></Link>
        <h1 className='form__title'>{props.title}</h1>
        <form className='form__form' name={props.name} id={props.name}>
          {props.children}
        </form>
      </div>

      <div className='form__button-container'>
        <span className='form-error'></span>
        <button className='form__confirm-button' type='submit' form={props.name}>{props.buttonTitle}</button>
        <div className='form__link-container'>
          <span className='form__link-span'>{props.linkSpan}</span>
          <Link to={props.path} className='form__form-link'>{props.linkName}</Link>
        </div>
      </div>
    </div>


  )
}

export default Form;
