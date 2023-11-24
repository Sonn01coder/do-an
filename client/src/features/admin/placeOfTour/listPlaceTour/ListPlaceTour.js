import React, { useContext } from 'react'
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { TourContext } from '../../../../shared/dataContext/TourContext'
import { Link } from 'react-router-dom';
import { ROUTER } from '../../../../shared/constants/Constants';

export default function ListPlaceTour({placeTour}) {
    const {setPopupAdmin} = useContext(TourContext)
  
  
    const showPopupAdmin = (item) => {
      setPopupAdmin({id: item.id, isPopup: true, content: `Place of Tour ${item.name}`, category: "place-tour"})
    }
   
    return (
      <div className='listTour_admin'>
          <div className='listTour_admin-title'>
              <section>Id</section>
              <section>Name</section>
              <section>Image</section>
          </div>
          <body className='listTour_admin-body'>
          {
              placeTour.map(item => (
              <div key={item.id}>
                  <section>{item.id}</section>
                  <section>{item.name}</section>
                  <section>
                    <img src={JSON.parse(item.image)[0]} alt={item.name} />
                  </section>
                  <span>
                      <Link to={`${ROUTER.ADMIN_PLACE_OF_TOUR_DETAIL}${item.name}`} >
                          <p><AiFillEdit /></p>
                      </Link>
                      <p onClick={() =>showPopupAdmin(item)}><AiFillDelete /></p>
                  </span>
              </div>
              ))
              }
          </body>
      </div>
    )
}
