import React, { useContext, useState } from 'react';
import './infoUserRegister.scss';
import { validationBookTour } from '../../../shared/validation';
import { AuthContext } from '../../../shared/dataContext/AuthContext';
import { TourContext } from '../../../shared/dataContext/TourContext';

export default function InfoUserRegister() {
  const {userCurrent} = useContext(AuthContext)
  const {bookTour, setBookTour} = useContext(TourContext)

  //validation 
  const [error, setError] = useState({name: '', phoneOne: '', phoneTwo: '' })

  return (
    <div className='infoUserRegister'>
      <h3>Thông tin liên hệ: </h3>
      <div className='infoUserRegister_input'>
      <div className='infoUserRegister_input-item'>
      <h5>Name</h5>
        <section>
          <input 
            type="text" 
            value={userCurrent.name || bookTour.name}
            onChange={e => setBookTour({...bookTour, name: e.target.value})}
            onBlur={() => setError({...error, name: validationBookTour(bookTour.name, bookTour.phone1, bookTour.phone2).name})}
          />
        </section>
        {error.name && <p>{error.name}</p>}
      </div>  	

      <div className='infoUserRegister_input-item'>
        <h5>Email</h5>
          <section>
            <input 
              type="text"
              value={userCurrent.email}
            />
          </section>
        </div>
        
        <div className='infoUserRegister_input-item'>
          <h5>Phone 1</h5>
          <section>
          <input 
            type="number" 
            value={bookTour.phoneOne}
            onChange={e => setBookTour({...bookTour, phone1: e.target.value})}
            onBlur={() => setError({...error, phoneOne: validationBookTour(bookTour.name,  bookTour.phone1, bookTour.phone2).phone1})}
          />
          </section>
          {error.phoneOne && <p>{error.phoneOne}</p>}
        </div>

      <div className='infoUserRegister_input-item'>
        <h5>Phone 2</h5>
        <section>
        <input 
          type="number" 
          value={bookTour.phoneTwo}
          onChange={e => setBookTour({...bookTour, phone2: e.target.value})}
          onBlur={() => setError({...error, phoneTwo: validationBookTour(bookTour.name, bookTour.phone1, bookTour.phone2).phone2})}
        />
        </section>
        {error.phoneTwo && <p>{error.phoneTwo}</p>}

      </div>
      </div>

    </div>
  )
}
