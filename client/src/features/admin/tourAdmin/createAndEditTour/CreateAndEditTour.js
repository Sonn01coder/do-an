import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TITLE_ADMIN } from '../../../../shared/constants/Constants'
import {FaCloudUploadAlt} from "react-icons/fa"
import {BiSolidPlusCircle} from "react-icons/bi"
import {IoMdRemoveCircleOutline} from "react-icons/io"
import {FiPlusCircle} from "react-icons/fi"
import "./createAndEditTour.scss"
import {TourContext} from "../../../../shared/dataContext/TourContext";

export default function CreateAndEditTour() {
    const {placeTour, createTour} = useContext(TourContext)
    
    //slug path
    const {slug} = useParams()

    //show input journey
    const [isInputAdd, setIsInputAdd] = useState(false)

    //value form
    const [valueForm, setValueForm] = useState({name: '', price: ''})

    //show popup 
    const [isPopup, setIsPopup] = useState(false)

    //journey tour
    const [journeyTour, setJourneyTour] = useState([])

    //value filter
    const [valueFilter, setValueFilter] = useState("")


    const handleInputPrice = (price) => {
    }

    //filter 
    const journeyTourFilter = placeTour.filter(item => item.name.toLowerCase().includes(valueFilter.toLowerCase()))

    const handleSaveTour = () => {
        void createTour({name: valueForm.name, placeId: JSON.stringify(journeyTour.map(item => item.id)), price: Number(valueForm.price)})
        setValueForm({name: '', price:""})
        setJourneyTour([])
    }

    const handlePickLocation = (place) => {
        setJourneyTour([...journeyTour, place])
        setIsPopup(false)
    }

    const popUpRef = useRef(null)

    //click outside
    useEffect(() => {
        const handler = (e) => {
          if (popUpRef?.current?.contains(e.target) === false) {
            setIsPopup(false);
          }
        };
        document.addEventListener('mousedown', handler);
    
        return () => {
          document.removeEventListener('mousedown', handler);
        };
      }, []);

  return (
    <div className='createAndEditTour'>
        <div className='createAndEditTour_title'>
            <h2>{slug ? TITLE_ADMIN.TOUR.EDIT : TITLE_ADMIN.TOUR.CREATE}</h2>
            <section onClick={handleSaveTour}><FaCloudUploadAlt /></section>
        </div>  

        <div className='createAndEditTour_content'>
            <div className='createAndEditTour_input'>
                <h4>Name</h4>
                <input 
                    type='text' 
                    placeholder='Name' 
                    value={valueForm.name}
                    onChange={e => setValueForm({...valueForm, name: e.target.value})}
                />
            </div>

            <div className='createAndEditTour_input'>
                <h4>Price</h4>
                <input 
                    type='text' 
                    placeholder='Price' 
                    value={valueForm.price}
                    onChange={e => setValueForm({...valueForm, price: e.target.value})}
                />
            </div>

            <div className='createAndEditTour_journey'>
                <h4>Journey</h4>
                <div className='createAndEditTour_journey-add'>
                    {
                        !isInputAdd ? 
                        <section onClick={() => setIsInputAdd(true)}><BiSolidPlusCircle /></section>
                        : (
                            <div className='createAndEditTour_input-wrapper'>
                                <input  
                                    type='text'
                                    placeholder='Journey'
                                    onClick={() => setIsPopup(true)}
                                />
                                {
                                    isPopup && (
                                        <div className='createAndEditTour_input-wrapper-popup' ref={popUpRef}>
                                            <input 
                                                type='text' 
                                                placeholder='keywords filter' 
                                                value={valueFilter}
                                                onChange={e => setValueFilter(e.target.value)}
                                            />
                                            <body>
                                            {
                                                journeyTourFilter.map(place => (
                                                    <div key={place.id}>
                                                        <p>{place.name}</p>
                                                        <span onClick={() => handlePickLocation(place) }><FiPlusCircle /></span>
                                                    </div>
                                                ))
                                            }
                                            </body>
                                        </div>
                                    )
                                }
                                {
                                    journeyTour.length > 0 && <div className='createAndEditTour_input-wrapper-list'>
                                        {
                                           journeyTour.map((journey, index) => (
                                                <div key={index}>
                                                    <h5>{index+1}.</h5>
                                                    <p>{journey.name}</p>
                                                    <section onClick={() => setJourneyTour(journeyTour.filter(item => item.name !== journey.name))}><IoMdRemoveCircleOutline /></section>
                                                </div>
                                            ))
                                        }
    
                                    </div>
                                }

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
