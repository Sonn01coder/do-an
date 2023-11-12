import React, { useContext } from 'react'
import { TourContext } from '../../shared/dataContext/TourContext'

export default function UserTour() {
  const {waypoints, setWaypoints} = useContext(TourContext)


  console.log(waypoints);

  return (
    <div>
      {waypoints.map(item => <div>{item}</div>)}
    </div>
  )
}
