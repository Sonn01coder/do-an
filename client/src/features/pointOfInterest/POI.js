import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import PoiList from './poiList/PoiList'
import PoiScreen from './poiScreen/PoiScreen'
import { POIContext } from '../../shared/dataContext/PointOfInterestContext'
import { VillageContext } from '../../shared/dataContext/VillageContext'

export default function POI() {
    const {slug, path} = useParams()
    const {villages} = useContext(VillageContext)
    const {poi} = useContext(POIContext)

    const village = villages.find(village => village.slug === slug)
    
    const poiVillage = poi.filter(item => item.villageId === village.id)

    return (
      <div className='product'>
        <div className='product_header'>
              <Link to={'/home'} >
                <h2>LÀNG VIỆT</h2>
              </Link>
              <button>ĐĂNG KÍ THAM QUAN</button>
        </div>
  
        <div className='product_content'>
        {
          !path ?  <PoiList village={village} poiVillage={poiVillage} /> : <PoiScreen />
        }
        </div>
      
        <div className='product_footer'>
          <div>
              <p>Phone: 0123456789</p>
              <p>Mail: abcxyz@gmail.com</p>
          </div>
  
          <div>Address: 133 Xuan Thuy, Cau Giay, Ha Noi</div>
        </div>
      </div>
  )
}
