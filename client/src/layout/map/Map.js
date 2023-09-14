import React, { useContext } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LOCATION_HANOI } from '../../shared/constants/Constants'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import "./map.scss";
import { VillageContext } from '../../shared/dataContext/VillageContext';
import { useParams } from 'react-router-dom';
import ChangeMap from './ChangeMap';



export default function Map() {
  const {villages} = useContext(VillageContext)

  const {slug} = useParams()

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
      villages.map(village => (
        <Marker 
          key={village.id}
          position={convertToArray(village)}
          icon={customIcon}
        >
          <Popup >
            <h4>{village.name}</h4>
            <img src={JSON.parse(village.image)[0]} alt={village.name} />
          </Popup>
        </Marker>
        ))
      }
      </MapContainer>
      </div>
      )
}
