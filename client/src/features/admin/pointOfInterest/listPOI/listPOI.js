import React, { useContext } from 'react';
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { Link } from 'react-router-dom';
import {ROUTER} from "../../../../shared/constants/Constants";
import { VillageContext } from '../../../../shared/dataContext/VillageContext';
import {AuthContext} from '../../../../shared/dataContext/AuthContext';
import { POIContext } from '../../../../shared/dataContext/PointOfInterestContext';
import "./listPOI.scss";

export default function ListPOI() {
  const {userCurrent} = useContext(AuthContext)

  const {villages, setPopupAdmin} = useContext(VillageContext)
  const {poi} = useContext(POIContext)

  const villageId = userCurrent?.role && userCurrent.role.match(/\d+/) ? Number(userCurrent.role.match(/\d+/)[0]) : 0;

  const POICurrentAdmin  = poi.filter(item => item.villageId === villageId)

  const showPopupAdmin = (item) => {
    setPopupAdmin({id: item.id, isPopup: true, content: `Point Of Interest ${item.name}`, category: "poi"})
  }

  const villageName = (idVillage) => {
    if(idVillage) {
      const village = villages.find(village => village.id === idVillage)
      return village?.name || ""
    }
  }

 
  return (
    <div className='poi_admin'>
        <div className='poi_admin-title'>
            <section>Id</section>
            <section>Name</section>
            <section>Slug</section>
            <section>Address</section>
            <section>Village</section>
            <section>Image</section>
        </div>
        <body className='poi_admin-body'>
        {
          (userCurrent?.role?.includes(process.env.REACT_APP_VILLAGE_USER) ? POICurrentAdmin : poi).map(item => (
            <div key={item.id}>
                <section>{item.id}</section>
                <section>{item.name}</section>
                <section>{item.slug}</section>
                <section>{item.address}</section>
                <section>{villageName(item.villageId)}</section>
                <section>
                  <img src={JSON.parse(item.image)[0]} alt={item.name} />
                </section>
                <span>
                    <Link to={`${ROUTER.ADMIN_POI_DETAIL}${item.slug}`} >
                        <p><AiFillEdit /></p>
                    </Link>
                    <p onClick={() =>showPopupAdmin(item)}><AiFillDelete /></p>
                </span>
            </div>
            ))
            }
        </body>
    </div>
  )
}
