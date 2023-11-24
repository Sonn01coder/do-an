import React, { useContext, useEffect, useRef, useState } from 'react'
import { ROUTER, showListLength } from '../../../shared/constants/Constants'
import { Link, useLocation } from 'react-router-dom';
import {AiFillCaretDown} from "react-icons/ai"
import {BsSearch} from "react-icons/bs" 
import CreateAndEditPlaceTour from './createAndEditPlaceTour/CreateAndEditPlaceTour';
import ListPlaceTour from './listPlaceTour/ListPlaceTour';
import { TourContext } from '../../../shared/dataContext/TourContext';

export default function PlaceOfTour() {
    const [listLength, setListLength] = useState(showListLength[0].length)
    const [openPopup, setOpenPopUp] = useState(false)

    const {placeTour} = useContext(TourContext)

    const [valueSearch, setValueSearch] = useState("")

    const [newPlaceTour, setNewPlaceTour] = useState(placeTour)

    const placeTourSearch = placeTour.filter(item => item.name.toLowerCase().includes(valueSearch.toLowerCase()))
  
    const popUpRef = useRef()
  
    //get current param
    const location = useLocation()
  
    //handle pick length show data
    const handlePickLength = (length) => {
      setListLength(length)
      setOpenPopUp(false)
    }

    useEffect(() => {
      if(listLength < placeTour.length) {
        const newArr = placeTour.slice(0, listLength)
        setNewPlaceTour(newArr)
      } else {
        setNewPlaceTour(placeTourSearch)
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
          !(location.pathname.includes(ROUTER.ADMIN_PLACE_OF_TOUR_CREATE) || location.pathname.includes(ROUTER.ADMIN_PLACE_OF_TOUR_DETAIL) ) ? 
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
                     <Link to={ROUTER.ADMIN_PLACE_OF_TOUR_CREATE}><button>Create</button></Link>
                     <input type="text"  placeholder='Nhập từ khóa tìm kiếm' value={valueSearch} onChange={e => setValueSearch(e.target.value)}/>
                     <section><BsSearch /></section>
                   </div>
               </div>
     
               <div>
                    <ListPlaceTour placeTour={newPlaceTour.length > 0 ? newPlaceTour : placeTourSearch}/>
               </div>
             </div>   
          ) : (
            <div className='productManagement_body'>
                <CreateAndEditPlaceTour />
            </div> 
          )
        }
      </section>
    )
}
