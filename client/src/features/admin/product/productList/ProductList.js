import React, { useContext } from 'react';
import "./productList.scss";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { Link } from 'react-router-dom';
import {ROUTER} from "../../../../shared/constants/Constants";
import { VillageContext } from '../../../../shared/dataContext/VillageContext';
import { AuthContext } from '../../../../shared/dataContext/AuthContext';

export default function ProductsAll({products}) {
  const {userCurrent} = useContext(AuthContext)
  const {villages, setPopupAdmin} = useContext(VillageContext)

  const villageId = userCurrent?.role && userCurrent.role.match(/\d+/) ? Number(userCurrent.role.match(/\d+/)[0]) : 0;

  const productCurrentAdmin  = products.filter(products => products.villageId=== villageId)


  const showPopupAdmin = (item) => {
    setPopupAdmin({id: item.id, isPopup: true, content: `Product ${item.name}`, category: "product"})
  }

  const villageName = (idVillage) => {
    if(idVillage) {
      const village = villages.find(village => village.id === idVillage)
      return village.name
    }
  }
 
  return (
    <div className='productList_admin'>
        <div className='productList_admin-title'>
            <section>Id</section>
            <section>Name</section>
            <section>Slug</section>
            <section>Village</section>
            <section>Image</section>
        </div>
        <body className='productList_admin-body'>
        {
            (userCurrent?.role?.includes(process.env.REACT_APP_VILLAGE_USER) ? productCurrentAdmin : products).map(item => (
            <div key={item.id}>
                <section>{item.id}</section>
                <section>{item.name}</section>
                <section>{item.slug}</section>
                <section>{villageName(item.villageId)}</section>
                <section>
                  <img src={JSON.parse(item.image)[0]} alt={item.name} />
                </section>
                <span>
                    <Link to={`${ROUTER.ADMIN_PRODUCT_DETAIL}${item.slug}`} >
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
