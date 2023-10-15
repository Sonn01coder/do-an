import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TourContext } from '../../../../shared/dataContext/TourContext'
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { ROUTER } from '../../../../shared/constants/Constants';
import './listTour.scss';


export default function ListTour() {
  const {tours, placeTour} = useContext(TourContext)

  const {setPopupAdmin} = useContext(TourContext)

  const showPopupAdmin = (item) => {
    setPopupAdmin({id: item.id, isPopup: true, content: `Place of Tour ${item.name}`, category: "place-tour"})
  }
  
  const handlePlaceOfTour = (arr) => {
    const newArr = JSON.parse(arr)
    return  placeTour.filter(place => newArr.includes(place.id))
  }

  return (
    <div className='listTour_admin'>
    <div className='listTour_admin-title'>
        <section>Id</section>
        <section>Name</section>
        <section>Journey</section>
    </div>
    <body className='listTour_admin-body'>
    {
        tours.map(item => (
        <div key={item.id}>
            <section>{item.id}</section>
            <section>{item.name}</section>
            <section className='item-flex-start'>
              {
                handlePlaceOfTour(item.placeId).map((place,index) => (
                  <p className='listTour-list-place' key={place.id}>{place.name} { handlePlaceOfTour(item.placeId).length === index+1 ? null :  '=>'} </p>
                ))
              }
            </section>
            <span>
                <Link to={`${ROUTER.ADMIN_TOUR_DETAIL}${item.name}`} >
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
