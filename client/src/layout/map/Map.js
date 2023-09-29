import React, { useContext, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LOCATION_HANOI } from '../../shared/constants/Constants'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import "./map.scss";
import { VillageContext } from '../../shared/dataContext/VillageContext';
import { POIContext } from '../../shared/dataContext/PointOfInterestContext';
import { Link, useParams } from 'react-router-dom';
import ChangeMap from './ChangeMap';
import {MdOutlineOpenInNew} from "react-icons/md"

export default function Map() {
  const {villages} = useContext(VillageContext)
  const {poi} = useContext(POIContext)

  const {slug} = useParams()

  //get village current
  const villageCurrent = villages.find(village => village.slug.trim() === slug)

  //get poi current
  const poiCurrent = slug ? poi.filter(item => item.villageId === villageCurrent.id) : []


  const customIcon = (image) => {
    const img = JSON.parse(image)
    
    return slug ? (
      new Icon({
        iconUrl: img[0],
        iconSize: [34, 34]
      })
    ) : (
      new Icon({
        iconUrl:require("../../shared/assest/image/icon.png"),
        iconSize: [38, 38]
      })
    )
  }

  const convertToArray = (village) => {
    const geocode = JSON.parse(village.geocode);
    return geocode
  }


  return (
    <div className='map'>
    <MapContainer center={LOCATION_HANOI} zoom={13}>
    <TileLayer 
      url='https://apis.wemap.asia/raster-tiles/styles/osm-bright/{z}/{x}/{y}@2x.png?key=eURZuPekNfEchcBlPDfiAgadLZJuhPKSw'
    />
    {slug ? <ChangeMap geocode={JSON.parse(villageCurrent.geocode)}/> : null} 
    {
      (poiCurrent.length > 0 ? poiCurrent : villages).map(village => (
        <Marker 
          key={village.id}
          position={convertToArray(village)}
          icon={customIcon(village.image)}
        >
          <Popup autoOpen={true} autoClose={true}>
            <div className='map_popup'>
              <div className='map_title'>
                <h4>{village.name}</h4>
                <Link className='map_link' to={!slug ? `/village/${village.slug}` : `/village/${villageCurrent.slug}/poi/${village.slug}`}>
                  <MdOutlineOpenInNew />
                </Link>
              </div>
              <img src={JSON.parse(village.image)[0]} alt={village.name} />
            </div>
          </Popup>
        </Marker>
        ))
      }
      </MapContainer>
      </div>
      )
}