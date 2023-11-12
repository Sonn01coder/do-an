import React, {  useContext, useEffect, useRef, useState } from 'react'
import {GiVillage} from 'react-icons/gi';
import {FaPlaceOfWorship, FaUsers} from 'react-icons/fa';
import {AiOutlineInbox} from 'react-icons/ai';
import {MdOutlineTour, MdLocationPin, MdShareLocation} from  'react-icons/md'
import './admin.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VillageManagement from './village/VillageManagement';
import ProductManagement from './product/ProductManagement';
import NotFound from './notFound/NotFound';
import PointOfInterest from './pointOfInterest/PointOfInterest';
import PointOfService from './pointOfService/PointOfService';
import NeighboringPoint from './neighboringPoint/NeighboringPoint';
import PlaceOfTour from './placeOfTour/PlaceOfTour';
import {TbTournament} from "react-icons/tb"
import TourAdmin from './tourAdmin/TourAdmin';
import UserAdmin from './userAdmin/UserAdmin';
import { AuthContext } from '../../shared/dataContext/AuthContext';
import { USER_DEFAULT } from '../../shared/constants/Constants';

const data = [
  {
    id: 1,
    name: 'Village',
    icon:  <GiVillage />,
    link: '/admin/village',
    role: "village_admin"
  },
  {
    id: 2,
    name: 'Product',
    icon:  <AiOutlineInbox />,
    link: '/admin/product',
    role: "village_admin"
  },
  {
    id: 3,
    name: 'Point of Interest',
    icon:  <FaPlaceOfWorship />,
    link: '/admin/poi',
    role: "village_admin"
  },
  {
    id: 4,
    name: 'Point of Service',
    icon:  <MdOutlineTour />,
    link: '/admin/pos',
    role: "admin"
  }, 
  {
    id: 5,
    name: 'Neighboring Point',
    icon: <MdLocationPin />,
    link: '/admin/nei',
    role: "admin"
  },
  {
    id:6,
    name:"Place of Tour",
    icon: <MdShareLocation />,
    link: '/admin/place-tour',
    role: "admin"
  },
  {
    id: 7,
    name: "Tour",
    icon: <TbTournament />,
    link: '/admin/tour',
    role: "admin"
  },
   {
    id:8,
    name: "User",
    icon: <FaUsers />,
    link: "/admin/user",
    role: "admin"
   }
]

export default function Admin() {
  const { userCurrent, setUserCurrent } = useContext(AuthContext)


  const [isPopupLogout, setIsPopupLogout] = useState(false)

  const navigate = useNavigate()

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
    ) : location.pathname.includes('/user') ? (
      setActiveId(data[7].id)
    ) : (
      <NotFound />
    )

  }, [location.pathname])

  const popupRef = useRef(null)

   //click outside
   useEffect(() => {
    const handler = (e) => {
      if (popupRef?.current?.contains(e.target) === false) {
        setIsPopupLogout(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  //logout
  const handleLogout = () => {
    setIsPopupLogout(false)
    setUserCurrent(USER_DEFAULT)
    navigate("/login")
  }

  const data_village_admin = data.filter(item => item.role === 'village_admin')

  return (
    <div className='admin'>
      <div className='admin_sidebar'>
        <h2>LÀNG NGHỀ</h2>

        <div className='admin_sidebar-navigation'>
          {
            
               (userCurrent?.role?.includes('villageId_user')  ? data_village_admin : data).map(item => (
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
          <div className='admin_content-header-admin'>
            <p>{userCurrent?.email}</p>
            <div onClick={() => setIsPopupLogout(true)}>{userCurrent?.email?.slice(0,2)?.toUpperCase()}</div>
            {
              isPopupLogout && (
                <section ref={popupRef} onClick={handleLogout}>
                    <span>Logout</span>
                </section>
              )
            }
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
            ) : location.pathname.includes('/user') ? (
              <UserAdmin />
            ) : (
              <NotFound />
            )
          }
        </div>
      </div>
    </div>
  )
}
