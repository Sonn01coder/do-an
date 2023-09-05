import React from 'react'
import './sidebar.scss';
import {FiSearch} from "react-icons/fi";
import {BsSignTurnRightFill} from "react-icons/bs";
import VillageDetail from '../../features/villageDetail/VillageDetail';
import { useLocation } from 'react-router-dom';
import VillageList from '../../features/villageList/VillageList';

export default function Sidebar() {
  const pathName = useLocation()

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
          <input type='text' placeholder='Tìm kiếm làng nghề'/>
          <section><FiSearch /></section>
        </div>

        <div className='sidebar_search-turn'><BsSignTurnRightFill /></div>
      </div>

      <div className='sidebar_content'>
        <div className='sidebar_content-wrapper'>
          {
            pathName.pathname === '/home' ? 
            <VillageList /> : <VillageDetail />
          }
        </div>
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
