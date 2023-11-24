import React, { useContext, useEffect, useRef, useState } from 'react'
import {AiFillCaretDown} from "react-icons/ai"
import {BsSearch} from "react-icons/bs";
import { ROUTER, showListLength } from '../../../shared/constants/Constants'
import { Link, useLocation } from 'react-router-dom'
import CreateAndEditPOI from './createAndEditPOI/CreateAndEditPOI';
import ListPOI from './listPOI/listPOI';
import { POIContext } from '../../../shared/dataContext/PointOfInterestContext';

export default function PointOfInterest() {
  const {poi} = useContext(POIContext)

  const [listLength, setListLength] = useState(showListLength[0].length)
  const [openPopup, setOpenPopUp] = useState(false)

  const popUpRef = useRef()

  const [newPoi, setNewPoi] = useState(poi)

  const [valueSearch, setValueSearch] = useState("")

  const poiSearch = poi.filter(product => product.name.toLowerCase().includes(valueSearch.toLowerCase()))

  //get current param
  const location = useLocation()

  //handle pick length show data
  const handlePickLength = (length) => {
    setListLength(length)
    setOpenPopUp(false)
  }

  useEffect(() => {
    if(listLength < poi.length) {
      const newArr = poi.slice(0, listLength)
      setNewPoi(newArr)
    } else {
      setNewPoi(poiSearch)
    }
  }, [listLength])

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
        !(location.pathname.includes(ROUTER.ADMIN_POI_CREATE) || location.pathname.includes(ROUTER.ADMIN_POI_DETAIL) ) ? 
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
                   <Link to={ROUTER.ADMIN_POI_CREATE}><button>Create</button></Link>
                   <input type="text"  placeholder='Nhập từ khóa tìm kiếm' value={ valueSearch} onChange={e => setValueSearch(e.target.value)}/>
                   <section><BsSearch /></section>
                 </div>
             </div>
   
             <div>
                <ListPOI poi={ newPoi.length > 0 ? newPoi : poiSearch}/>
             </div>
           </div>   
        ) : (
          <div className='productManagement_body'>
            <CreateAndEditPOI />
          </div> 
        )
      }
    </section>
  )
}
