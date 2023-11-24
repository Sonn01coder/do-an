import React, { useContext, useEffect, useRef, useState } from 'react';
import {BsSearch} from "react-icons/bs";
import {AiFillCaretDown} from "react-icons/ai"
import { Link, useLocation } from 'react-router-dom';
import { ROUTER, showListLength } from '../../../shared/constants/Constants';
import CreateAndEditVillage from './createAndEditVillage/CreateAndEditVillage';
import VillageAdmin from './villageAdmin/VillageAdmin';
import "./VillageManagement.scss";
import { AuthContext } from '../../../shared/dataContext/AuthContext';
import { VillageContext } from '../../../shared/dataContext/VillageContext';

export default function VillageManagement() {
    const {userCurrent} = useContext(AuthContext)
    
    const {villages} = useContext(VillageContext)

    const [newVillages, setNewVillages] = useState(villages)

    const [listLength, setListLength] = useState(showListLength[0].length)
    const [openPopup, setOpenPopUp] = useState(false)

    //value form search
    const [valueSearch, setValueSearch] = useState("")

    const villageSearch = villages.filter(village => village.name.toLowerCase().includes(valueSearch.toLowerCase()))

    useEffect(() => {
       if(listLength < villages.length) {
        const newArr = villages.slice(0, listLength)
        setNewVillages(newArr)
      } else {
        setNewVillages(villageSearch)
      }
    }, [listLength])

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
    <section className='villageManagement'>
    {
        !(location.pathname.includes(ROUTER.ADMIN_VILLAGE_DETAIL) || location.pathname.includes(ROUTER.ADMIN_VILLAGE_CREATE) ) ? 
        (
          <div className='villageManagement_body'>
             <div className='villageManagement_body-header'>
                 <div className='villageManagement_body-header-show'>
                   <div className='villageManagement_body-header-show-option' onClick={() => setOpenPopUp(true)}>
                       <p>Show {listLength}</p>
                       <section><AiFillCaretDown/></section>
                   </div>
                   {
                     openPopup && (
                         <section className='villageManagement_body-header-show-popup' ref={popUpRef}>
                             {
                                 showListLength.map( item =>
                                     <p key={item.id} onClick={() => handlePickLength(item.length)}>{item.length}</p>
                                 )
                             }
                         </section>
                     )
                   }
                 </div>
   
                 <div className='villageManagement_body-header-search'>
                   { !userCurrent?.role?.includes(process.env.REACT_APP_VILLAGE_USER) && <Link to={ROUTER.ADMIN_VILLAGE_CREATE}><button>Create</button></Link> }
                   <input 
                    type="text"  
                    placeholder='Nhập từ khóa tìm kiếm'
                    value={valueSearch}
                    onChange={e => setValueSearch(e.target.value)}
                  />
                   <section><BsSearch /></section>
                 </div>
             </div>
   
             <div>
                   <VillageAdmin villages={newVillages.length > 0 ? newVillages : villageSearch} />
             </div>
           </div>   
        ) : (
          <div className='villageManagement_body'>
              <CreateAndEditVillage />
          </div> 
        )
      }
    </section>
  )
}
