import React, { useContext } from 'react';
import { TourContext } from '../../../shared/dataContext/TourContext';
import { AuthContext } from '../../../shared/dataContext/AuthContext';
import "./paymentTour.scss";

export default function PaymentTours() {
  const { bookTour, createHistoryTour, placeTour, tours } = useContext(TourContext)
  const { userCurrent } = useContext(AuthContext)

  //create history tour
  const handleCreateHistoryTour = () => {
    // void createHistoryTour({userId: userCurrent.id, tourId: bookTour.tourId, dateStart: bookTour.dateStart, dateEnd: bookTour.dateEnd, tickerNumber: bookTour.ticket})
  }

  //filter tour 
  const tourCurrent = tours.find(tour => tour.id === bookTour.tourId)


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

  console.log(bookTour);

  // const isDisabled = 


  return (
    <div className='paymentTour'>
      <h3>Thanh toán tour: </h3>
      <div className='paymentTour_client'>
        <h4>Khách hàng: </h4>
        <div className='paymentTour_client-info'>
          <div className='paymentTour_client-info-input'>
            <p>Name </p>
            <input type='text' value={bookTour.name || userCurrent.name} />
          </div>
          
          <div className='paymentTour_client-info-input'>
            <p>Email </p>
            <input type='text' value={userCurrent.email} />
          </div>

          <div className='paymentTour_client-info-input'>
            <p>Phone 1 </p>
            <input type='number' value={bookTour.phone1 ||"" } />
          </div>

          <div className='paymentTour_client-info-input'>
            <p>Phone 2 </p>
            <input type='number' value={bookTour.phone2 || ""} />
          </div>
        </div>
      </div>
        
      <div className='paymentTour_tour'>
        <h4>Tour 1: </h4>
        <div className='paymentTour_tour-info'>
          <div>
            <p>Lộ trình: </p>
            {handleRenderJourney(handlePlaceOfTour(tourCurrent.placeId))}
          </div>

          <div>
            <p>Giá vé</p>
            <span>{tourCurrent.price.toLocaleString('vi-VN')} VND</span>
          </div>

          <div>
            <p>Thành tiền:</p>
            <span>{tourCurrent.price.toLocaleString('vi-VN')} VND x {bookTour.ticket} vé = {(tourCurrent.price * bookTour.ticket).toLocaleString('vi-VN')} VND</span>
          </div>
        </div>
      </div>
      <div className='paymentTour_btn'>
        <button onClick={handleCreateHistoryTour}>Pay</button>
      </div>
    </div>
  )
}
