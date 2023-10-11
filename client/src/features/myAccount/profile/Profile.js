import React, { useState } from 'react'
import './profile.scss';
import { Link } from 'react-router-dom';
import { validationProfile } from '../../../shared/validation';

export default function Profile() {
    const [value, setValue] = useState({name: '', phone: ''})
    const [error, setError] = useState({name: '', phone: ''})

    const isDisabled = error.name !== undefined && error !== undefined 

  return (
    <div className='profile'>
      <div className='profile_wrapper-input'>
        <div className='profile-input'>
            <p>Name</p>
            <section>
                <input
                    type='text'
                    placeholder='Nhập tên của bạn'
                    value={value.name}
                    onChange={e=>setValue({...value, name:e.target.value})}
                    onBlur={() => setError({...error, name: validationProfile(value.name, value.phone).name})}
                />
                {error.name && <p className='profile-error'>{error.name}</p>}
            </section>
        </div>

        <div className='profile-input'>
            <p>Email</p>
            <input
                placeholder='Nhập email của bạn'
            />
        </div>

        <div className='profile-input'>
            <p>Phone</p>
            <section>
                <input
                type='text'
                placeholder='Nhập số điện thoại của bạn'
                value={value.phone}
                onChange={e => setValue({...value, phone: e.target.value})}
                onBlur={() => setError({...error, phone: validationProfile(value.name, value.phone).phone})}
                />
                {error.phone && <p className='profile-error'>{error.phone}</p>}
            </section>
        </div>

        <div className='profile-input'>
            <p>Password</p>
            <input
                type='password'
                placeholder='Nhập mật khẩu của bạn'
            />
        </div>
      </div>

      <div className='profile_footer'>
        <Link className='profile_footer-link'>Change password</Link>
        <button className={isDisabled ? 'profile-btn-disabled' : ""}>Save</button>
      </div>
    </div>
  )
}
