import React, { useContext } from 'react';
import "./villageAdmin.scss";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { VillageContext } from '../../../shared/dataContext/VillageContext';
import { Link } from 'react-router-dom';
import {ROUTER} from "../../../shared/constants/Constants";



export default function VillageAdmin() {
  const {villages} = useContext(VillageContext)

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
                    <p><AiFillDelete /></p>
                </span>
            </div>
            ))
            }
        </body>
    </div>
  )
}
