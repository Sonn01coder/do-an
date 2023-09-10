import React, { useContext, useEffect, useRef, useState } from 'react'
import {GiVillage} from 'react-icons/gi';
import {FaPlaceOfWorship} from 'react-icons/fa';
import {AiOutlineInbox} from 'react-icons/ai';
import {MdOutlineTour} from  'react-icons/md'
import './admin.scss';
import { Link, useLocation } from 'react-router-dom';
import VillageManagement from './village/VillageManagement';
import ProductManagement from './product/ProductManagement';
import PlaceManagement from './place/PlaceManagement';
import TouristManagement from './tourist/TouristManagement';
import NotFound from './notFound/NotFound';

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
    name: 'Place',
    icon:  <FaPlaceOfWorship />,
    link: '/admin/place'
  },
  {
    id: 4,
    name: 'Tourist',
    icon:  <MdOutlineTour />,
    link: '/admin/tourist'
  }, 
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
    ) : location.pathname.includes('/place') ? (
      setActiveId(data[2].id)
    ) : location.pathname.includes('/tourist') ? (
      setActiveId(data[3].id)
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
            ) : location.pathname.includes('/place') ? (
              <PlaceManagement />
            ) : location.pathname.includes('/tourist') ? (
              <TouristManagement />
            ) : (
              <NotFound />
            )
          }
        </div>
      </div>
    </div>
  )
}
