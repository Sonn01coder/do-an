import React, { useContext, useEffect, useState } from 'react';
import "./historyTour.scss";
import { TourContext } from '../../../shared/dataContext/TourContext';
import { Link } from 'react-router-dom';

export default function HistoryTour() {

  const {historyTour, tours, placeTour} = useContext(TourContext)

  const [userCurrentId, setUserCurrentId] = useState(0)


  useEffect(() => {
    const getLocalUserId = localStorage.getItem('userIdFair');
    if (getLocalUserId) {
        setUserCurrentId(JSON.parse(getLocalUserId))
    } else {
      setUserCurrentId(0)
    }
  });

  //filter history tour user
  const filterHistoryTour = historyTour.filter(tour => tour.userId === userCurrentId)

  //filter tour
  const filterTours = filterHistoryTour.map(tour => { 
    const newTour = tours.find(item => item.id === tour.tourId)
    return {...tour, ...newTour}
  })

  //filter place of tour
  const handlePlaceOfTour = (arr) => {
    const newArr = JSON.parse(arr)
    return  placeTour.filter(place => newArr.includes(place.id))
  }

  //handle render journey tour
  const handleRenderJourney = (arr) => {
    let renderedString = "Xuất phát từ ";

    for (let i = 0; i < arr.length; i++) {
      renderedString += arr[i].name;
      
      if(arr[i].name.includes("nhà hàng")) {
        renderedString += " ăn trưa"
      }

      if (i < arr.length - 2) {
        renderedString += ', đi đến ';
      } else if (i === arr.length - 2) {
        renderedString += ' và cuối cùng về ';
      }
    }
    
    renderedString += ".";

    return renderedString;
  }

  //handle slug tour: Tour 1 => tour-1
  const handleSlugTour = (string) => {
    return "/tour/" + string.toLowerCase().replace(/\s+/g, "-")
  }

  return (
    <div className='historyTour'>
    {
      filterTours.length > 0 ? (
      filterTours.map(tour => (
        <div className='historyTour_tour' key={tour.id}>
          <h3>{tour.name}:</h3>
          <p>Lộ trình: {handleRenderJourney(handlePlaceOfTour(tour.placeId))}</p>
          <p>Ngày đi: {tour.dateStart}</p>
          <p>Ngày về: {tour.dateEnd}</p>
          <p>Giá {tour.price.toLocaleString('vi-VN')} x {tour.tickerNumber} vé = {(tour.price * tour.tickerNumber).toLocaleString('vi-VN')} VND </p>
          <p className='historyTour_tour-link'><Link to={handleSlugTour(tour.name)}>Xem chi tiết lộ trình trên map</Link></p>
        </div>
      ))) : (
        <div className='historyTour_tour'>Chưa có tour nào được book</div>
      )
    }
    </div>
  )
}
