import React from 'react'
import "../scss/components/popupAdmin.scss";
import {AiOutlineDelete} from 'react-icons/ai'


export default function PopupAdmin() {
  return (
    <div className='popupAdmin'>
        <div className='popupAdmin_container'>
            <div className='popupAdmin_container-content'>
                <section><AiOutlineDelete /></section>
                <h3>Are you sure you want to delete village Bat TrangBat TrangBat TrangBat TrangBat Trang?</h3>
            </div>
            <div className='popupAdmin_container-button'>
                <button>Yes</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
  )
}
