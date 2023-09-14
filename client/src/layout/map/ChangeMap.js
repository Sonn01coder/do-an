import { useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


export default function ChangeMap() {
    const map = useMap()

    map.setView([20.97680019333064, 105.91003709350106], 15, {
        animate:true
    })
  return null
}
