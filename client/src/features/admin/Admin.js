import React, { useContext, useEffect, useRef, useState } from 'react'
import {GiVillage} from 'react-icons/gi';
import {FaPlaceOfWorship} from 'react-icons/fa';
import {AiOutlineInbox} from 'react-icons/ai';
import {MdOutlineTour} from  'react-icons/md'
import './admin.scss';
import {BsSearch} from "react-icons/bs";
import {AiFillCaretDown} from "react-icons/ai"
import { ROUTER, showListLength } from '../../shared/constants/Constants';
import VillageAdmin from './villageAdmin/VillageAdmin';
import CreateAndEditVillage from './createAndEditVillage/CreateAndEditVillage';
import { VillageContext } from '../../shared/dataContext/VillageContext';
import { Link, useLocation } from 'react-router-dom';

const data = [
  {
    id: 1,
    name: 'Village',
    icon:  <GiVillage />
  },
  {
    id: 2,
    name: 'Product',
    icon:  <AiOutlineInbox />
  },
  {
    id: 3,
    name: 'Place',
    icon:  <FaPlaceOfWorship />
  },
  {
    id: 4,
    name: 'Tourist',
    icon:  <MdOutlineTour />
  }, 

]

export default function Admin() {

  const [listLength, setListLength] = useState(showListLength[0].length)
  const [openPopup, setOpenPopUp] = useState(false)

  //get current param
  const location = useLocation()

  //handle pick length show data
  const handlePickLength = (length) => {
      setListLength(length)
      setOpenPopUp(false)
  }

  const popUpRef = useRef()

  //click outside
  useEffect(() => {
      const handler = (e) => {
        if (popUpRef?.current?.contains(e.target) === false) {
          setOpenPopUp(false);
        }
      };
  
      document.addEventListener('mousedown', handler);
  
      return () => {
        document.removeEventListener('mousedown', handler);
      };
    }, []);

  return (
    <div className='admin'>
      <div className='admin_sidebar'>
        <h2>LÀNG NGHỀ</h2>

        <div className='admin_sidebar-navigation'>
          {
            data.map(item => (
              <div className={item.id===1 ? 'active' : ''} key={item.id}>
                  <section>{item.icon}</section>
                  <p>{item.name}</p>
              </div>
            ))
          }
        </div>
      </div>

      <div className='admin_content'>
        <div className='admin_content-header'>
          <div>
            <section>
              <img src='https://yt3.ggpht.com/a/AATXAJzENkjCwI-ZdY5tls6YfiuWGb32Ufs7Jo6wfQ=s900-c-k-c0xffffffff-no-rj-mo'  alt='avt'/>
            </section>
            <p>Son Nguyen Truong</p>
          </div>
        </div>
        
        {
          !(location.pathname.includes(ROUTER.ADMIN_VILLAGE_DETAIL) || location.pathname.includes(ROUTER.ADMIN_VILLAGE_CREATE) ) ? 
          (
            <div className='admin_content-body'>
               <div className='admin_content-body-header'>
                   <div className='admin_content-body-header-show'>
                     <div className='admin_content-body-header-show-option' onClick={() => setOpenPopUp(true)}>
                         <p>Show {listLength}</p>
                         <section><AiFillCaretDown/></section>
                     </div>
                     {
                       openPopup && (
                           <section className='admin_content-body-header-show-popup' ref={popUpRef}>
                               {
                                   showListLength.map( item =>
                                       <p key={item.id} onClick={() => handlePickLength(item.length)}>{item.length}</p>
                                   )
                               }
                           </section>
                       )
                     }
                   </div>
     
                   <div className='admin_content-body-header-search'>
                     <Link to={ROUTER.ADMIN_VILLAGE_CREATE}><button>Create</button></Link>
                     <input type="text"  placeholder='Nhập từ khóa tìm kiếm'/>
                     <section><BsSearch /></section>
                   </div>
               </div>
     
               <div>
                     <VillageAdmin />
               </div>
             </div>   
          ) : (
            <div className='admin_content-body'>
                <CreateAndEditVillage />
            </div> 
          )
        }

      </div>
      </div>
  )
}
