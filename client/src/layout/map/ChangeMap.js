import { useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from  "leaflet";
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';


export default function ChangeMap({geocode}) {
    const map = useMap()

    map.setView(geocode, 15, {
        animate:false
    })
  return null
}

export  function TourMap({waypoints}) {
  const map = useMap()

  if (waypoints && waypoints.length > 1) {
    L.Routing.control({
        waypoints: waypoints.map(point => L.latLng(point[0], point[1])),
    }).addTo(map);
}
return null
}


