import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LOCATION_HANOI } from '../../shared/constants/Constants'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import "./map.scss";
import { VillageContext } from '../../shared/dataContext/VillageContext';
import { POIContext } from '../../shared/dataContext/PointOfInterestContext';
import { Link, useParams } from 'react-router-dom';
import ChangeMap from './ChangeMap';
import axios from 'axios';



export default function Map() {
  const [point, setPoint] = useState([])

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

//   const getNearbyPlaces = async (location, type, radius, apiKey) => {
//     try {
//       const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
//         params: {
//           location: `${location.lat},${location.lng}`,
//           radius: radius,
//           type: type,
//           key: apiKey
//         }
//       });
      
//       console.log(response.data.results);
//       return response.data.results;
//     } catch (error) {
//       console.error('Lỗi khi lấy dữ liệu từ Google Places API:', error);
//     }
//   };


//   const location = { lat:20.97680019333064 , lng: 105.91003709350106 }; 
//   const radius = 1000; 
//   const apiKey = 'AIzaSyA5KoMADDMYxIGDSGhkdm2DF2VbtW3lvoU';


// useEffect(() => {
//   if(slug) {
//     const fetchData = async () => {
//       const result = await getNearbyPlaces(location, 'restaurant', radius, apiKey);
//       console.log(result);
//     }

//      fetchData()
//   } 
      
// }, [slug]);


console.log(point);

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
