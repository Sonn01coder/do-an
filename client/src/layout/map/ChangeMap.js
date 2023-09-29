import { useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


export default function ChangeMap({geocode}) {
    const map = useMap()

    map.setView(geocode, 15, {
        animate:false
    })
  return null
}


