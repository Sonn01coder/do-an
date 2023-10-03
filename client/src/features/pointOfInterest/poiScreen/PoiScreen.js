import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { VillageContext } from '../../../shared/dataContext/VillageContext';
import { POIContext } from '../../../shared/dataContext/PointOfInterestContext';
import "./poiScreen.scss"

export default function PoiScreen() {
  const {poi} = useContext(POIContext)
  const {villages} = useContext(VillageContext)
  
  const {slug, path} = useParams()

  const poiCurrent = poi.find(item => item.slug.trim() === path)
  
  const villageCurrent = villages.find(village => village.id === poiCurrent.villageId)

  const listPoi = poi.filter(item => item.villageId === villageCurrent.id && item.id !== poiCurrent.id)
  
  return (
    <div className='poiScreen'>
      <div className='poiScreen_path'>
          <Link to={"/home"} className='poiScreen_path-link'>
            <p>Home</p>
            <span>{' > '}</span>
          </Link>
          <Link to={`/village/${slug}`} className='poiScreen_path-link'>
            <p>{villageCurrent.name}   </p>
            <span>{' >'} </span>
          </Link>
          <Link to={`/village/${slug}/poi`} className='poiScreen_path-link'>
            <p>Địa điểm tham quan</p>
            <span> {'> '}</span>
          </Link>
              <p>{poiCurrent.name}</p>
      </div>

      <div className='poiScreen_wrapper'>
        <div className='poiScreen_wrapper-content'>
          <img src={JSON.parse(poiCurrent.image)[0]} alt={poiCurrent.name} />
          <section>
            <h1>{poiCurrent.name}</h1>
            <h4>Mô tả: </h4>
            <p dangerouslySetInnerHTML={{ __html: poiCurrent.description}}/>
          </section>
        </div>

        <div className='poiScreen_wrapper-footer'>
          <h3>CÁC ĐỊA ĐIỂM KHÁC CỦA {villageCurrent.name.toUpperCase()} :</h3>
          <section>
          {
            listPoi.lenght > 0 ? (
              (
                listPoi.map(item => (
                  <Link key={item.id} className='item_wrapper-footer-item' to={`/village/${slug}/poi/${item.slug}`}>
                    <img  src={JSON.parse(item.image)[0]} alt={item.name} />
                    <p>{item.name}</p>
                  </Link>
                ))
              ) 
            ) : (
              <p>Không còn địa điểm nào phù hợp</p>
            )
          }
            
          </section>
        </div>
      </div>
    </div>
  )
}
