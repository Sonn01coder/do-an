import React, { useContext } from 'react'
import Village from './village/Village';
import './villageList.scss';
import {VillageContext} from '../../shared/dataContext/VillageContext';
import { Link } from 'react-router-dom';

export default function VillageList({valueSearch}) {
  const {villages} = useContext(VillageContext)
  
  const villageSearch = villages.filter(village => village.name.toLowerCase().includes(valueSearch.toLowerCase()))

  return (
    <div className='villageList'>
      { villageSearch.length > 0 ?
        (villageSearch.map(village => (
          <Link to={`/village/${village.slug}`} key={village.id}>
            <Village village={village}  />
          </Link>
        ))) : (
          <h4>Không có làng nào phù hợp</h4>
        )
      }
    </div>
  )
}
