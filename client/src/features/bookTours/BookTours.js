import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./bookTours.scss";
import { LIST_NAVIGATE_BOOKTOURS } from '../../shared/constants/Constants';
import InfoTour from './infoTour/InfoTour';
import {GrLinkNext, GrLinkPrevious} from 'react-icons/gr';
import InfoUserRegister from './infoUserRegister/InfoUserRegister';
import PaymentTours from './paymentTours/PaymentTours';

export default function BookTours() {

    const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className='bookTours'>
        <div className='bookTours_header'>
            <Link to={'/home'} >
                <h2>LÀNG VIỆT</h2>
            </Link>
        </div>

        <div className='bookTours_content'> 
            <div className='bookTours_content-wrapper'>
                <div className='bookTours_content-wrapper-navigate'>
                {
                    LIST_NAVIGATE_BOOKTOURS.map(item => (
                        <div key={item.id} className='bookTours_navigate-number'>
                            <p className={item.id === currentPage ? 'bookTours-active' :''}>{item.number}</p>
                            <section style={{display: item.id === LIST_NAVIGATE_BOOKTOURS[LIST_NAVIGATE_BOOKTOURS.length - 1].id ? "none" : ""}} >
                            </section>
                        </div>
                    ))
                }
                </div>

                <div className='bookTours_content-wrapper-pages'>
                    {
                        currentPage === 1 ? <InfoTour />
                        : currentPage === 2 ? <InfoUserRegister />
                        : currentPage === 3 ? <PaymentTours />
                        : <h1>404</h1>
                    }
                </div>

                <div className='bookTours_content-wrapper-btn'>
                    <section className={currentPage === 1 ? "bookTours-btn-disabled" : ""} onClick={() => setCurrentPage(currentPage - 1)}> <GrLinkPrevious /></section>
                    <section className={currentPage === 3 ? "bookTours-btn-disabled" : ""} onClick={() => setCurrentPage(currentPage + 1)}> <GrLinkNext /></section>
                </div>
            </div>
        </div>
    </div>
  )
}
