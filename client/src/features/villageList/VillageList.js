import React, { useContext } from 'react'
import Village from './village/Village';
import './villageList.scss';
import {VillageContext} from '../../shared/dataContext/VillageContext';
import { Link } from 'react-router-dom';

export default function VillageList() {
  const {villages} = useContext(VillageContext)

  return (
    <div className='villageList'>
      {
        villages.map(village => (
          <Link to={`/village/${village.slug}`} key={village.id}>
            <Village village={village}  />
          </Link>
        ))
      }
    </div>
  )
}
