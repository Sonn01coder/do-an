import React, {  useEffect, useState } from 'react'
import {GiVillage} from 'react-icons/gi';
import {FaPlaceOfWorship} from 'react-icons/fa';
import {AiOutlineInbox} from 'react-icons/ai';
import {MdOutlineTour, MdLocationPin, MdShareLocation} from  'react-icons/md'
import './admin.scss';
import { Link, useLocation } from 'react-router-dom';
import VillageManagement from './village/VillageManagement';
import ProductManagement from './product/ProductManagement';
import NotFound from './notFound/NotFound';
import PointOfInterest from './pointOfInterest/PointOfInterest';
import PointOfService from './pointOfService/PointOfService';
import NeighboringPoint from './neighboringPoint/NeighboringPoint';
import PlaceOfTour from './placeOfTour/PlaceOfTour';
import {TbTournament} from "react-icons/tb"
import TourAdmin from './tourAdmin/TourAdmin';

const data = [
  {
    id: 1,
    name: 'Village',
    icon:  <GiVillage />,
    link: '/admin/village'
  },
  {
    id: 2,
    name: 'Product',
    icon:  <AiOutlineInbox />,
    link: '/admin/product'
  },
  {
    id: 3,
    name: 'Point of Interest',
    icon:  <FaPlaceOfWorship />,
    link: '/admin/poi'
  },
  {
    id: 4,
    name: 'Point of Service',
    icon:  <MdOutlineTour />,
    link: '/admin/pos'
  }, 
  {
    id: 5,
    name: 'Neighboring Point',
    icon: <MdLocationPin />,
    link: '/admin/nei'
  },
  {
    id:6,
    name:"Place of Tour",
    icon: <MdShareLocation />,
    link: '/admin/place-tour'
  },
  {
    id: 7,
    name: "Tour",
    icon: <TbTournament />,
    link: '/admin/tour'
  }
]

export default function Admin() {
  //active
  const [activeId , setActiveId] = useState(data[0].id)

  //get current param
  const location = useLocation()

  //path => active

  useEffect(() => {
    location.pathname.includes("/village") ? (
      setActiveId(data[0].id)
    ) : location.pathname.includes('/product') ? (
      setActiveId(data[1].id)
    ) : location.pathname.includes('/poi') ? (
      setActiveId(data[2].id)
    ) : location.pathname.includes('/pos') ? (
      setActiveId(data[3].id)
    ) : location.pathname.includes('/nei') ? (
      setActiveId(data[4].id)
    ) : location.pathname.includes('/place-tour') ? (
      setActiveId(data[5].id)
    ) : location.pathname.includes('/tour') ? (
      setActiveId(data[6].id)
    ) : (
      <NotFound />
    )

  }, [location.pathname])


  return (
    <div className='admin'>
      <div className='admin_sidebar'>
        <h2>LÀNG NGHỀ</h2>

        <div className='admin_sidebar-navigation'>
          {
            data.map(item => (
              <Link to={item.link} key={item.id} onClick={() => setActiveId(item.id)}>
                <div className={item.id === activeId ? 'active' : ''}>
                  <section>{item.icon}</section>
                  <p>{item.name}</p>
                </div>
              </Link>
            ))
          }
        </div>
      </div>

      <div className='admin_content'>
        <div className='admin_content-header'>
          <div>
            <section>
              <img src='https://yt3.ggpht.com/a/AATXAJzENkjCwI-ZdY5tls6YfiuWGb32Ufs7Jo6wfQ=s900-c-k-c0xffffffff-no-rj-mo'  alt='avt'/>
            </section>
            <p>Son Nguyen Truong</p>
          </div>
        </div>
        
        <div className='admin_content-body'>
          {
            location.pathname.includes("/village") ? (
              <VillageManagement />
            ) : location.pathname.includes('/product') ? (
              <ProductManagement />
            ) : location.pathname.includes('/poi') ? (
              <PointOfInterest />
            ) : location.pathname.includes('/pos') ? (
              <PointOfService />
            ) : location.pathname.includes('/nei') ? (
              <NeighboringPoint />
            ) : location.pathname.includes('/place-tour') ? (
              <PlaceOfTour />
            ) : location.pathname.includes('/tour') ? (
              <TourAdmin />
            ) : (
              <NotFound />
            )
          }
        </div>
      </div>
    </div>
  )
}
