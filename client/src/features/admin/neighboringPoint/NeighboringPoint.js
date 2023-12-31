import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTER, showListLength } from '../../../shared/constants/Constants'
import {AiFillCaretDown} from "react-icons/ai"
import {BsSearch} from "react-icons/bs"
import ListNei from './listNei/ListNei'

export default function NeighboringPoint() {
    const [listLength, setListLength] = useState(showListLength[0].length)
    const [openPopup, setOpenPopUp] = useState(false)
  
    const popUpRef = useRef()
  
    //get current param
    const location = useLocation()
  
    //handle pick length show data
    const handlePickLength = (length) => {
      setListLength(length)
      setOpenPopUp(false)
    }
  
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
      <section className='productManagement'>
      {
          !(location.pathname.includes(ROUTER.ADMIN_POS_CREATE) || location.pathname.includes(ROUTER.ADMIN_POS_DETAIL) ) ? 
          (
            <div className='productManagement_body'>
               <div className='productManagement_body-header'>
                   <div className='productManagement_body-header-show'>
                     <div className='productManagement_body-header-show-option' onClick={() => setOpenPopUp(true)}>
                         <p>Show {listLength}</p>
                         <section><AiFillCaretDown/></section>
                     </div>
                     {
                       openPopup && (
                           <section className='productManagement_body-header-show-popup' ref={popUpRef}>
                               {
                                   showListLength.map( item =>
                                       <p key={item.id} onClick={() => handlePickLength(item.length)}>{item.length}</p>
                                   )
                               }
                           </section>
                       )
                     }
                   </div>
     
                   <div className='productManagement_body-header-search'>
                     <Link to={ROUTER.ADMIN_POS_CREATE}><button>Create</button></Link>
                     <input type="text"  placeholder='Nhập từ khóa tìm kiếm'/>
                     <section><BsSearch /></section>
                   </div>
               </div>
     
               <div>
                    <ListNei />
               </div>
             </div>   
          ) : (
            <div className='productManagement_body'>

            </div> 
          )
        }
      </section>
    )
}
