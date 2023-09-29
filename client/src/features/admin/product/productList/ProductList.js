import React, { useContext } from 'react';
import "./productList.scss";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { Link } from 'react-router-dom';
import {ROUTER} from "../../../../shared/constants/Constants";
import { VillageContext } from '../../../../shared/dataContext/VillageContext';
import { ProductContext } from '../../../../shared/dataContext/ProductContetx';

export default function ProductsAll() {
  const {villages, setPopupAdmin} = useContext(VillageContext)
  const {products} = useContext(ProductContext)


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
            products.map(item => (
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
