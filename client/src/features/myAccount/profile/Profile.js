import React, { useContext, useEffect, useState } from 'react'
import './profile.scss';
import { validationProfile } from '../../../shared/validation';
import { AuthContext } from '../../../shared/dataContext/AuthContext';

export default function Profile() {
  const {userCurrent, updateInfoUser, setIsPopupChangePassword} = useContext(AuthContext)

    const [value, setValue] = useState({name: userCurrent?.name, phone: userCurrent?.phone1})
    const [error, setError] = useState({name: '', phone: ''})

    const isDisabled = error.name !== undefined && error !== undefined 

    const handleUpdateInfoUser = () => {
      void updateInfoUser({name: value.name, phone1: Number(value.phone), id: userCurrent?.id})
    }

    useEffect(() => {
      if (userCurrent) {
          setValue({ name: userCurrent.name, phone: userCurrent.phone1 });
      }
  }, [userCurrent]);

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
                value={userCurrent?.email || ''}
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
                value={"password"}
            />
        </div>
      </div>

      <div className='profile_footer'>
        <div onClick={() => setIsPopupChangePassword(true)} className='profile_footer-link'>Change password</div>
        <button onClick={handleUpdateInfoUser} className={isDisabled ? 'profile-btn-disabled' : ""}>Save</button>
      </div>
    </div>
  )
}
