import React from 'react'

import './forms.css';

export const inputField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
      <div>
        <input {...input} placeholder={label} className='inputFormField' type={type} />
        <div className='errorMessageFormFields'>
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
            </div>
      </div>
    </div>
  )