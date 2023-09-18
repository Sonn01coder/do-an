import React, { useContext } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LOCATION_HANOI } from '../../shared/constants/Constants'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import "./map.scss";
import { VillageContext } from '../../shared/dataContext/VillageContext';
import { POIContext } from '../../shared/dataContext/PointOfInterestContext';
import { Link, useParams } from 'react-router-dom';
import ChangeMap from './ChangeMap';



export default function Map() {
  const {villages} = useContext(VillageContext)
  const {poi} = useContext(POIContext)

  const {slug} = useParams()

  //get village current
  const villageCurrent = villages.find(village => village.slug.trim() === slug)

  //get poi current
  const poiCurrent = slug ? poi.filter(item => item.villageId === villageCurrent.id) : []

  const customIcon = new Icon({
    iconUrl:require("../../shared/assest/image/icon.png"),
    iconSize: [38, 38]
  })

  const convertToArray = (village) => {
    const geocode = JSON.parse(village.geocode);
    return geocode
  }

  return (
    <div className='map'>
    <MapContainer center={LOCATION_HANOI} zoom={13}>
    <TileLayer 
      attribution='map base'
      url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    {slug ? <ChangeMap /> : null} 
    {
      (poiCurrent.length > 0 ? poiCurrent : villages).map(village => (
        <Marker 
          key={village.id}
          position={convertToArray(village)}
          icon={customIcon}
          
        >
          <Popup autoOpen={true} autoClose={true}>
            <Link to={!slug ? `/village/${village.slug}` : `/village/${villageCurrent.slug}/poi/${village.slug}`}>
              <h4>{village.name}</h4>
              <img src={JSON.parse(village.image)[0]} alt={village.name} />
            </Link>
          </Popup>
        </Marker>
        ))
      }
      </MapContainer>
      </div>
      )
}
