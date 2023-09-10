import React, { useContext } from 'react';
import "./villageAdmin.scss";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { Link } from 'react-router-dom';
import {ROUTER} from "../../../../shared/constants/Constants";
import { VillageContext } from '../../../../shared/dataContext/VillageContext';



export default function VillageAdmin() {
  const {villages, setPopupAdmin} = useContext(VillageContext)


  const showPopupAdmin = (item) => {
    setPopupAdmin({id: item.id, isPopup: true, content: `Village ${item.name}`, category: "village"})
  }

  return (
    <div className='villageAdmin'>
        <div className='villageAdmin_title'>
            <section>Id</section>
            <section>Name</section>
            <section>Slug</section>
            <section>Address</section>
        </div>
        <body>
        {
            villages.map(item => (
            <div key={item.id}>
                <section>{item.id}</section>
                <section>{item.name}</section>
                <section>{item.slug}</section>
                <section>{item.address}</section>
                <span>
                    <Link to={`${ROUTER.ADMIN_VILLAGE_DETAIL}${item.slug}`} >
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
