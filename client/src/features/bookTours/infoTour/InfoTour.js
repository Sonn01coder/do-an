import React, { useEffect, useRef, useState } from 'react';
import "./infoTour.scss";
import {BsChevronDown} from "react-icons/bs";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";	

const list_tour = [
    {
        id: 1,
        name: 'Tour 1'
    },
    {
        id: 2,
        name: 'Tour 2'
    },
    {
        id: 3,
        name: 'Tour 3'
    },
    {
        id: 4,
        name: 'Tour 4'
    },
    {
        id: 5,
        name: 'Tour 5'
    },
]

export default function InfoTour() {

    const [tourCurrent, setTourCurrent] = useState(list_tour[0].name)

    const [isPopupTours, setIsPopupTours] = useState(false)

    const [countTickets, setCountTickets] = useState(1)

    const popupTourRef = useRef(null)

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
    setTourCurrent(tour)
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
                    {tourCurrent}
                    <span><BsChevronDown /></span>
                </section>
                {
                    isPopupTours && (
                        <div className='infoTour_category-current-list' ref={popupTourRef}>
                        {
                            list_tour.map(tour => (
                                 <span onClick={() => handlePickTour(tour.name)} key={tour.id}>{tour.name}</span>
                            ))
                        }
                        </div>
                    )
                }
            </div>
        </section>
        <p className='infoTour_journey'>
        <section>Lộ trình: </section>   
        Làng Bát Tràng, thành Cổ Loa, đền An Dương Vương
        </p>
        <div className='infoTour_journey-detail'>
            <p>Chi tiết:</p> 
            <section>
                <span>- Xuất phát tại VNU</span>
                <span>- Đến làng Bát Tràng</span>
                <span>- Tiếp đó đến thành Cổ Loa</span>
                <span>- Di chuyển tới đền An Dương Vương</span>
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
    </div>
  )
}
