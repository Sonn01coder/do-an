import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LOCATION_HANOI } from '../../shared/constants/Constants'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import "./map.scss";
import { villages } from '../../shared/constants/data';

export default function Map() {

  const customIcon = new Icon({
    iconUrl:require("../../shared/assest/image/icon.png"),
    iconSize: [38, 38]
  })

  return (
    <div className='map'>
    <MapContainer center={LOCATION_HANOI} zoom={12}>
    <TileLayer 
      attribution='map base'
      url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    {
      villages.map(village => (
        <Marker 
          key={village.id}
          position={village.location}
          icon={customIcon}
        >
          <Popup >
            <h4>{village.name}</h4>
            <img src={village.img} alt={village.name} />
          </Popup>
        </Marker>
        ))
      }
      </MapContainer>
      </div>
      )
}
