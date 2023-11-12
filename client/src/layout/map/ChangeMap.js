import { LayerGroup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from  "leaflet";
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import marche from '../../shared/assest/image/marche.gif';
import { useContext, useEffect } from 'react';
import { TourContext } from '../../shared/dataContext/TourContext';


export default function ChangeMap({geocode}) {
    const map = useMap()

    map.setView(geocode, 15, {
        animate:false
    })

  return null
}

export  function ToursMap(place) {
  const map = useMap()


  let DefaultIcon = L.icon({
    iconUrl: marche,
    iconSize: [70, 70],
  });
  
  const waypoints = place.place.placesGeocode
  const newArr = place.place.places

  const getImgPlace = (index) => {
    const listImg  = newArr.map(place =>  JSON.parse(place.image)[0]) 
    return listImg[index]
  }

  const getLinkPlace = (index) => {
    const listLink = newArr.map(place => place.link)

    return listLink[index]
  }
   
  const marker1 = L.marker(waypoints[0], {icon: DefaultIcon}).addTo(map)

   const routingControl =  L.Routing.control({
      waypoints: waypoints.map(point => L.latLng(point[0], point[1])),
      lineOptions: {
        styles: [
          {
            color: "blue",
            weight:5,
            opacity: 0.6
          }
        ]
      },
      routeWhileDragging: true,
      createMarker: function(i, wp, nWps) {
        return L.marker(wp.latLng, {
          icon: new L.DivIcon({
            className: 'custom-icon-user-tour',
            html: `<div>${i + 1}</div>`,
            iconSize: [30, 30],
          }),
        })
        .on('click', function(e) {
          map.setView([e.latlng.lat, e.latlng.lng], 16, {
            animate:true
        })
        });
      }
    })
    .on("routesfound", function(e){
        e.routes[0].coordinates.forEach((geocode, index) => {
          setTimeout(()=> {
            marker1.setLatLng([geocode.lat, geocode.lng])
          }, 50 * index)
        })
    })
     .addTo(map);
  map.setView(map.getCenter(), 12);

    // waypoints.forEach((point, index) => {
    //   L.marker(L.latLng(point[0], point[1]), {
    //     icon: new L.DivIcon({
    //       className: 'custom-icon',
    //       html: `<div>${index + 1}</div>`,
    //       iconSize: [30, 30],
    //     }),
    //   })
    //   .bindPopup(`<a href=${getLinkPlace(index)}><img  class="img_popup_tour" src=${getImgPlace(index)}/></a>`).openPopup()
    //   .addTo(map);

    // });
    
  useEffect(() => {
    return () => map.removeControl(routingControl);
  }, [map, routingControl])

  return null
}

export function UserTour(){
  const {waypoints, setWaypoints} = useContext(TourContext)

  const map = useMap();

  //function button
  function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }
  
  //on click location in map
  map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
    startBtn = createButton('Chọn làm điểm xuất phát', container),
        destBtn = createButton('Chọn làm điểm tới', container);

      L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

      L.DomEvent.on(startBtn, 'click', function() {
        const newWaypoints = [[e.latlng.lat, e.latlng.lng], ...waypoints];
        setWaypoints(newWaypoints);
        map.closePopup();
      });

      L.DomEvent.on(destBtn, 'click', function() {
        const newWaypoints = [...waypoints, [e.latlng.lat, e.latlng.lng]];
        setWaypoints(newWaypoints);
        map.closePopup();
      });
    });
  
  const routingControl = L.Routing.control({
      waypoints:  waypoints.map(point => L.latLng(point[0], point[1])),
    lineOptions: {
      styles: [
        {
          color: "blue",
          weight:5,
          opacity: 0.6
        }
      ]
    },
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim(),
    addWaypoints: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
    show: true,
    createMarker: function(i, wp, nWps) {
      return L.marker(wp.latLng, {
        icon: new L.DivIcon({
          className: 'custom-icon-user-tour',
          html: `<div>${i + 1}</div>`,
          iconSize: [30, 30],
        }),
      })
      .on('click', function(e) {
        map.setView([e.latlng.lat, e.latlng.lng], 16, {
          animate:true
      })
      });
    }
  })
  .on("routesfound", function(e){
    var routed = e.waypoints
  })
  .addTo(map);
  map.setView(map.getCenter(), 12);

useEffect(() => {
  return () => map.removeControl(routingControl);
}, [map, routingControl])

 return null;

}