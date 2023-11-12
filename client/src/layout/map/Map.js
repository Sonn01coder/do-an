
import React, { useContext } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LOCATION_HANOI } from '../../shared/constants/Constants'
import {  Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import "./map.scss";
import { VillageContext } from '../../shared/dataContext/VillageContext';
import { POIContext } from '../../shared/dataContext/PointOfInterestContext';
import { Link, useLocation, useParams } from 'react-router-dom';
import ChangeMap, { ToursMap, UserTour }  from './ChangeMap';
import {MdOutlineOpenInNew} from "react-icons/md"
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { TourContext } from '../../shared/dataContext/TourContext';

export default function Map() {
  const {villages} = useContext(VillageContext)
  const {poi} = useContext(POIContext)
  const {tours, placeTour} = useContext(TourContext)

  //handle slug tour
  const handleSlugTour = (string) => {
    return string.toLowerCase().replace(/\s+/g, "-")
  }

  //get slug
  const {slug} = useParams()

  //get tour current 
  const tourCurrent = tours.find(tour => handleSlugTour(tour.name) === slug)

  //filter place of tour
  const handleGeocodePlaceOfTour = (arr) => {
    const newArr = JSON.parse(arr)
    const places =   placeTour.filter(place => newArr.includes(place.id))
    const placesGeocode = places.map(place => JSON.parse(place.geocode))

    return {placesGeocode, places}
  }

  //get location
  const location = useLocation()

  const isPathName = (pathname, name) => pathname.includes(name)

  //check Is village
  const isVillage = isPathName(location.pathname, "/village/")

  //check Is Tour
  const isTour = isPathName(location.pathname, "/tour/")

  //check Is Home
  const isHome = isPathName(location.pathname, "/home")

  //check is user tour
  const isUserTour = isPathName(location.pathname, "/user-tour")

  //get village current
  const villageCurrent = villages.find(village => village.slug.trim() === slug)

  //get poi current
  const poiCurrent = isVillage ? poi.filter(item => item.villageId === villageCurrent.id) : []

  const customIcon = (image) => {
    const img = JSON.parse(image);
    return isHome ? (
      new Icon({
        iconUrl: require("../../shared/assest/image/icon.png"),
        iconSize: [38, 38]
      })
    ) : isVillage ?  (
      new Icon({
        iconUrl: img[0],
        iconSize: [34, 34]
      })
    )  : null
  };

  const convertToArray = (village) => {
    const geocode = JSON.parse(village.geocode);
    return geocode
  }

  return (
    <div className='map'>
    <MapContainer center={LOCATION_HANOI} zoom={11}>
    <TileLayer 
      url='https://apis.wemap.asia/raster-tiles/styles/osm-bright/{z}/{x}/{y}@2x.png?key=eURZuPekNfEchcBlPDfiAgadLZJuhPKSw'
    />
    {isVillage ? <ChangeMap geocode={JSON.parse(villageCurrent.geocode)}/> : null} 
    {isTour ? <ToursMap place={handleGeocodePlaceOfTour(tourCurrent.placeId)}/> : null}
    {isUserTour ? <UserTour /> : null}
    {
      (poiCurrent.length > 0 ? poiCurrent : isHome ? villages :  []).map((village) => (
        <Marker 
          key={village.id}
          position={convertToArray(village)}
          icon={customIcon(village?.image)}
        >
          <Popup autoOpen={true} autoClose={true}>
            <div className='map_popup'>
              <div className='map_title'>
                <h4>{village.name}</h4>
                <Link className='map_link' to={isHome ? `/village/${village.slug}` : isVillage ? `/village/${villageCurrent.slug}/poi/${village.slug}` : ""}>
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

