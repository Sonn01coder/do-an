import React, { useContext, useEffect, useState } from 'react';
import {GrClose} from "react-icons/gr";
import "../scss/components/popupChangePassword.scss";
import { validationChangePassword } from '../validation';
import { AuthContext } from '../dataContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { USER_DEFAULT } from '../constants/Constants';

export default function PopupChangePassword() {

  const navigate = useNavigate()

  const {setIsPopupChangePassword, changePassword, userCurrent, setUserCurrent} = useContext(AuthContext)

  const [valueForm, setValueForm] = useState({oldPassword: '', newPassword: '', confirmPassword: ''});

  // error message
  const [error, setError] = useState({oldPassword: '', newPassword: '', confirmPassword: ''})

  const disabledBtn = error.oldPassword || error.newPassword || error.confirmPassword 

  const handleCheckChangePassword = async () => {
    const res = await changePassword({id: userCurrent?.id || 0, oldPassword: valueForm.oldPassword, newPassword: valueForm.newPassword})

    if(res?.status === 200) {
      setIsPopupChangePassword(false)
      setTimeout(() => {
        localStorage.removeItem('userIdFair');
        setUserCurrent(USER_DEFAULT)
        navigate("/login")
      }, 1000)
    }
  }

  const handleChangePassword = () => {
    void handleCheckChangePassword()
  }

  return (
    <div className='changePassword'>
      <div className='changePassword_container'>
          <div className='changePassword_container-title'>
            <h2>Thay đổi mật khẩu</h2>
            <section onClick={() => setIsPopupChangePassword(false)}><GrClose /></section>
          </div>
          <div className='changePassword_container-wrapper'>
            <div className='changePassword_container-wrapper-input'>
              <h4>Old password: </h4>
              <div>
                <input 
                  type='password' 
                  placeholder='password...' 
                  value={valueForm.oldPassword}
                  onChange={e => setValueForm({...valueForm, oldPassword: e.target.value})}
                  onBlur={() => setError({...error, oldPassword: validationChangePassword(valueForm.oldPassword, valueForm.newPassword, valueForm.confirmPassword).oldPassword})}
                />
                {error.oldPassword && <p>{error.oldPassword}</p>}
              </div>
            </div>

            <div className='changePassword_container-wrapper-input'>
              <h4>New password: </h4>
              <div>
                <input 
                  type='password' 
                  placeholder='password...' 
                  value={valueForm.newPassword}
                  onChange={e => setValueForm({...valueForm, newPassword: e.target.value})}
                  onBlur={() => setError({...error, newPassword: validationChangePassword(valueForm.oldPassword, valueForm.newPassword, valueForm.confirmPassword).newPassword})}
                />
                {error.newPassword && <p>{error.newPassword}</p>}
              </div>
            </div>

            <div className='changePassword_container-wrapper-input'>
              <h4>Confirm password: </h4>
              <div>
                <input 
                  type='password' 
                  placeholder='password...' 
                  value={valueForm.confirmPassword}
                  onChange={e => setValueForm({...valueForm, confirmPassword: e.target.value})}
                  onBlur={() => setError({...error, confirmPassword: validationChangePassword(valueForm.oldPassword, valueForm.newPassword, valueForm.confirmPassword).confirmPassword})}
                />
                {error.confirmPassword && <p>{error.confirmPassword}</p>}
              </div>
            </div>
          </div>

          <div className='changePassword_container-btn'>
            <button onClick={handleChangePassword} className={disabledBtn !== undefined ? "disabled-btn" : ""}>Save</button>
          </div>
      </div>
    </div>
  )
}
