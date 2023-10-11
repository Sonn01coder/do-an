import React, { useState } from 'react';
import './infoUserRegister.scss';
import { validationBookTour } from '../../../shared/validation';

export default function InfoUserRegister() {
  const [valueForm, setValueForm] = useState({name: '', email: '', phoneOne: '', phoneTwo: ''})
  const [error, setError] = useState({name: '', email: '', phoneOne: '', phoneTwo: '' })
  
  return (
    <div className='infoUserRegister'>
      <h3>Thông tin liên hệ: </h3>
      <div className='infoUserRegister_input'>
      <div className='infoUserRegister_input-item'>
      <h5>Name</h5>
        <section>
          <input 
            type="text" 
            value={valueForm.name}
            onChange={e => setValueForm({...valueForm, name: e.target.value})}
            onBlur={() => setError({...error, name: validationBookTour(valueForm.name, valueForm.email, valueForm.phoneOne, valueForm.phoneTwo).name})}
          />
        </section>
        {error.name && <p>{error.name}</p>}
      </div>  	

      <div className='infoUserRegister_input-item'>
        <h5>Email</h5>
        <section>
        <input 
          type="text"
          value={valueForm.email}
          onChange={e => setValueForm({...valueForm, email: e.target.value})}
          onBlur={() => setError({...error, email: validationBookTour(valueForm.name, valueForm.email, valueForm.phoneOne, valueForm.phoneTwo).email})}
        />
        </section>
        {error.email && <p>{error.email}</p>}
        </div>
        
        <div className='infoUserRegister_input-item'>
        <h5>Phone 1</h5>
        <section>
        <input 
          type="text" 
          value={valueForm.phoneOne}
          onChange={e => setValueForm({...valueForm, phoneOne: e.target.value})}
          onBlur={() => setError({...error, phoneOne: validationBookTour(valueForm.name, valueForm.email, valueForm.phoneOne, valueForm.phoneTwo).phoneOne})}
        />
        </section>
        {error.phoneOne && <p>{error.phoneOne}</p>}
        </div>

      <div className='infoUserRegister_input-item'>
        <h5>Phone 2</h5>
        <section>
        <input 
          type="text" 
          value={valueForm.phoneTwo}
          onChange={e => setValueForm({...valueForm, phoneTwo: e.target.value})}
          onBlur={() => setError({...error, phoneTwo: validationBookTour(valueForm.name, valueForm.email, valueForm.phoneOne, valueForm.phoneTwo).phoneTwo})}
        />
        </section>
        {error.phoneTwo && <p>{error.phoneTwo}</p>}

      </div>
      </div>
    </div>
  )
}
