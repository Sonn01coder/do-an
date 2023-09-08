import React from 'react'
import Village from './village/Village';
import './villageList.scss';
import { villages } from '../../shared/constants/data';

export default function VillageList() {
  return (
    <div className='villageList'>
      {
        villages.map(village => <Village village={village}/>)
      }
    </div>
  )
}
