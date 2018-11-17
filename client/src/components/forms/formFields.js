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
        <input {...input} placeholder={label} className='inputField' type={type} />
        <div className='errorMessage'>
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
            </div>
      </div>
    </div>
  )