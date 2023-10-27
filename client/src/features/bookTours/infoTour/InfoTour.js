import React, { useContext, useEffect, useRef, useState } from 'react';
import "./infoTour.scss";
import {BsChevronDown} from "react-icons/bs";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";	
import { TourContext } from '../../../shared/dataContext/TourContext';

export default function InfoTour() {

    const {nameTour, tours, placeTour, setBookTour, bookTour} = useContext(TourContext)
    
    //filter tour book when click button book tour
    const tourBook =  tours.find(tour => tour.name === nameTour)
    
    //tour name current
    const [tourNameCurrent, setTourNameCurrent] = useState(tourBook.name)

    //tour current
    const [tourCurrent, setTourCurrent] = useState(tours[0])

    //show popup
    const [isPopupTours, setIsPopupTours] = useState(false)

    //ticket number
    const [countTickets, setCountTickets] = useState(1)

    //ref popup
    const popupTourRef = useRef(null)

    //filter name tour 
    const listNameTours = tours.map(tour => tour.name)

    //change tour current
    useEffect(() => {
      const newTour = tours.find(tour => tour.name === tourNameCurrent)
      setBookTour({...bookTour, tourId: newTour.id})
      setTourCurrent(newTour)
    }, [tourNameCurrent])

    useEffect(() => {
      setBookTour({...bookTour, ticket: countTickets})
    }, [countTickets])

  //filter place of tour
  const handlePlaceOfTour = (arr) => {
    const newArr = JSON.parse(arr)
    return  placeTour.filter(place => newArr.includes(place.id))
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
            } else if (i < arr.length - 2) {
                renderedString.push(`Tiếp đó ${arr[i].name}`)
            } else if (i === arr.length - 1) {
                renderedString.push(`Và cuối cùng đến ${arr[i].name}`)
            }
        }
    }

    return renderedString;
  }

    //click outside
  useEffect(() => {
    const handler = (e) => {
      if (popupTourRef?.current?.contains(e.target) === false) {
        setIsPopupTours(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  //handle pick tour
  const handlePickTour = (tour) => {
    setTourNameCurrent(tour)
    setIsPopupTours(false)
  }

  const handlePlusTickets = () => {
    const numberTicketCount = Number(countTickets)
    setCountTickets(numberTicketCount + 1)
  }

  const handleMinusTickets = () => {
    const numberTicketCount = Number(countTickets)
    setCountTickets(numberTicketCount - 1)
  }

  return (
    <div className='infoTour'>
        <h3>Thông tin tour: </h3>
        <section className='infoTour_category'>
            <p>Tour: </p>
            <div className='infoTour_category-current'>
                <section onClick={() => setIsPopupTours(true)}>
                    {tourNameCurrent}
                    <span><BsChevronDown /></span>
                </section>
                {
                    isPopupTours && (
                        <div className='infoTour_category-current-list' ref={popupTourRef}>
                        {
                            listNameTours.map((tourName, index) => (
                                 <span onClick={() => handlePickTour(tourName)} key={index}>{tourName}</span>
                            ))
                        }
                        </div>
                    )
                }
            </div>
        </section>
        <p className='infoTour_journey'>
            <section>Lộ trình: </section>   
            {handlePlaceOfTour(tourCurrent.placeId).map((place, index) => <span key={place.id}>{index === 0 ? place.name : `, ${place.name}`}</span>) }
        </p>
        <div className='infoTour_journey-detail'>
            <p>Chi tiết:</p> 
            <section>
            {
              handleRenderJourney(handlePlaceOfTour(tourCurrent.placeId)).map((place, index) => (
                <span key={index}>- {place}</span>
              ))
            }
            </section>
        </div>
        <div className='infoTour_ticket'>
            <p>Số lượng vé: </p>
            <div className='infoTour_ticket-count'>
                <input 
                    type='text' 
                    value={countTickets}
                    onChange={e => setCountTickets(e.target.value)} 
                    onBlur={() => {countTickets === ''  ? setCountTickets(1): setCountTickets(countTickets > 0 ?  countTickets : 1)}}
                />
                <div>
                    <span onClick={handlePlusTickets}><FaChevronUp /></span>
                    <span className={countTickets === 1 ? "count-disabled" : ''} onClick={handleMinusTickets}><FaChevronDown /></span>
                </div>
            </div>
        </div>

        <div className="infoTour_date">
            <section>Date :</section>
            <span>
              <div className='infoTour_date-input'>
                <p>Date start</p>
                <input 
                  type="date" 
                  placeholder='Date start' 
                  min="2023-09-01" 
                  value={bookTour.dateStart}
                  onChange={e => setBookTour({...bookTour, dateStart: e.target.value})}
                />
              </div>
              
              <div className='infoTour_date-input'>
                <p>Date end</p>
                <input 
                  type="date" 
                  placeholder='Date end' 
                  min={bookTour.dateStart} 
                  value={bookTour.dateEnd}
                  onChange={e => setBookTour({...bookTour, dateEnd: e.target.value})}
                />
              </div>
            </span>
        </div>
    </div>
  )
}
