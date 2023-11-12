import React, {  useContext, useEffect, useRef, useState } from 'react'
import './sidebar.scss';
import {FiSearch} from "react-icons/fi";
import {AiOutlineUserAdd} from "react-icons/ai";
import VillageDetail from '../../features/villageDetail/VillageDetail';
import { Link, useLocation } from 'react-router-dom';
import VillageList from '../../features/villageList/VillageList';
import PopupHover from '../../shared/components/PopupHover';
import { ProductContext } from '../../shared/dataContext/ProductContetx';
import TourMap from '../../features/tour/tourMap/TourMap';
import Avatar from '../../features/avatar/Avatar';
import { AuthContext } from '../../shared/dataContext/AuthContext';
import UserTour from '../../features/userTour/UserTour';

export default function Sidebar() {
  const location = useLocation()
  const {popupProduct, setPopupProduct} = useContext(ProductContext)
  const {userCurrent} = useContext(AuthContext)

  const [valueSearch, setValueSearch] = useState("")

  const popupRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
    if (popupRef?.current?.contains(e.target) === false) {
        setPopupProduct({...popupProduct, isPopup: false, product: {}});
    }
    };
    document.addEventListener('mousedown', handler);

    return () => {
    document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <section>
          <h1>LÀNG VIỆT</h1>
          <div>
            <p>Hòa mình vào làng nghề</p>
            <p>Nơi hành trình bắt đầu</p>
          </div>
        </section>
      </div>

      <div className='sidebar_search'>
        <div className='sidebar_search-input'>
          <input 
            type='text' 
            placeholder='Tìm kiếm làng nghề'
            value={valueSearch}
            onChange={e => setValueSearch(e.target.value)}
          />
          <section><FiSearch /></section>
        </div>

        <div  className='sidebar_search-turn'>
        {
          userCurrent.email === "" ?(
            <Link to='/login' className='sidebar_search-turn-login'>
              <AiOutlineUserAdd />
            </Link>
          ) : <Avatar />  
        }
        </div> 
      </div>

      <div className='sidebar_content'>
        <div className='sidebar_content-wrapper' >
          {
            location.pathname === '/home' ? 
            <VillageList valueSearch={valueSearch} /> :
            location.pathname.includes("/village/") ?  <VillageDetail /> :
            location.pathname === '/user-tour' ? <UserTour />
            : <TourMap />
          }
        </div>
        {
          popupProduct.isPopup ? (
            <div className='sidebar_content-popup-product' ref={popupRef}>
              <PopupHover />
            </div>
          ) : null
        }
      </div>

      <div className='sidebar_footer'>
        <p>Contact:</p>
        <section>
          <p>Phone: 012345678</p>
          <p>Email: abcxyz@gmail.com</p>
        </section>
        <p>Address: 133 Xuân Thủy, Cầu Giấy, Hà Nội</p>
      </div>
    </div>
  )
}
