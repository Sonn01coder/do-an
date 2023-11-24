import React, { useContext } from 'react';
import {AiFillHome} from "react-icons/ai";
import "./tourMap.scss";
import { Link, useParams } from 'react-router-dom';
import { TourContext } from '../../../shared/dataContext/TourContext';

export default function TourMap() {
    const {tours, placeTour, setNameTour, setBookTour, bookTour} = useContext(TourContext) 

    const {slug} = useParams()

    //handle slug tour
  const handleSlugTour = (string) => {
    return string.toLowerCase().replace(/\s+/g, "-")
  }

    //get tour current 
  const tourCurrent = tours.find(tour => handleSlugTour(tour.name) === slug)

  //filter place of tour
  const handlePlaceOfTour = (arr) => {
    const newArr = JSON.parse(arr)
    return placeTour.filter(place => newArr.includes(place.id))
  }

  //handle render journey tour
  const handleRenderJourney = (arr) => {
    const renderedString = [];

    for (let i = 0; i < arr.length; i++) {
      
      if(arr[i].name.includes("nhà hàng")) {
        if(i===arr.length-1) {
            renderedString.push(`Và cuối cùng về ${arr[i].name} ăn trưa`)

        } else {
            renderedString.push(`Đến ${arr[i].name} ăn trưa`)
        }
      } else {
            if(i===0) {
              renderedString.push(`Xuất phát từ ${arr[i].name}`)
            } else if (i <=  arr.length - 2) {
                renderedString.push(`Tiếp đó ${arr[i].name}`)
            } else if (i === arr.length - 1) {
                renderedString.push(`Và cuối cùng đến ${arr[i].name}`)
            }
        }
    }

    return renderedString;
  }


  const handleBookTour = () => {
    setNameTour(tourCurrent.name)
    setBookTour({...bookTour, tourId: tourCurrent.id})
  }

  return (
    <div className='tourMap'>
    <div className='tourMap_header'>
      <div className='tourMap_navigate'> 
          <h3>{tourCurrent.name.toUpperCase()}</h3>
          <Link to={"/home"}><AiFillHome /></Link>
      </div>

      <div className='tourMap_tour'>
          <div className='tourMap_tour-content'>
              <div className='tourMap_tour-content-journey'>
                  <h4>Lộ trình:</h4>
                  {
                      handleRenderJourney(handlePlaceOfTour(tourCurrent.placeId)).map((place, index) => (
                          <p key={place}>{index + 1}.{place}</p>
                      ))
                  }
                </div>

                <div className='tourMap_tour-content-price'>
                <h4>Giá vé:</h4> 
                <p>{tourCurrent.price.toLocaleString('vi-VN')} VND / người</p>
                </div>
            </div>
            <Link to={"/tour"} className='tourMap_tour-more'>Xem thêm các tour khác</Link>
        </div>
      </div>
        <div className='tourMap_register'>
            <Link to={"/book-tour"} className='tourMap_register-link' onClick={handleBookTour}>ĐĂNG KÍ THAM QUAN {tourCurrent.name.toUpperCase()}</Link>
        </div>
    </div>
  )
}
