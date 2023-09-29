import React, { useContext, useEffect, useRef, useState } from 'react';
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { Link } from 'react-router-dom';
import {ROUTER} from "../../../../shared/constants/Constants";
import { VillageContext } from '../../../../shared/dataContext/VillageContext';
import axios from 'axios';
import { NeiContext } from '../../../../shared/dataContext/NeighboringPointContext';

export default function ListNei() {
  const {villages, setPopupAdmin} = useContext(VillageContext)
  const {createNei, neiVillage} = useContext(NeiContext)

  const [isPopupVillage, setIsPopupVillage] = useState(false)

  const [selectedItem, setSelectedItem] = useState(null)


  const showPopupAdmin = (item) => {
    setPopupAdmin({id: item.id, isPopup: true, content: `Neighoring ${item.name}`, category: "nei"})
  }

  const villageName = (idVillage) => {
    if(idVillage) {
      const village = villages.find(village => village.id === idVillage)
      return village.name || ""
    }
  }

  const [villageCurrent, setVillageCurrent] = useState(villages[0])

  const handleAddNei = ({name, villageId, category, geocode}) => {
    const nei = { name: name,category: category,villageId: villageId, geocode: JSON.stringify(geocode)}
    console.log(nei);
    void createNei(nei)
  }

    const neiRef = useRef()

    const handleShowPopup = (item) => {
        setSelectedItem(item.id)
        setIsPopupVillage(true)
    }

    //click outside
    useEffect(() => {
        const handler = (e) => {
          if (neiRef?.current?.contains(e.target) === false) {
            setIsPopupVillage(false);
          }
        };
        document.addEventListener('mousedown', handler);
    
        return () => {
          document.removeEventListener('mousedown', handler);
        };
      }, []);


    const handlePickVillage = (village) => {
        setVillageCurrent(village)
    }



  return (
    <div className='productList_admin'>
        <div className='productList_admin-title'>
            <section>Id</section>
            <section>Name</section>
            <section>Village</section>
            <section>Category</section>
        </div>
        <body className='productList_admin-body'>
        {
            neiVillage.map(item => (
            <div key={item.id}>
                <section>{item.id}</section>
                <section>{item.tags.name || "Dịch vụ"}</section>
                <section onClick={() => handleShowPopup(item)}>
                    {villageCurrent.name}
                    {
                        isPopupVillage && selectedItem === item.id && (
                            <h3 ref={neiRef}>
                                {
                                    villages.map(village => (
                                        <h5 key={village.id} onClick={() => handlePickVillage(village)}>{village.name}</h5>
                                    ))
                                }
                            </h3>
                        )
                    }
                </section>
                <section>{item.tags.amenity}</section>
                <span>
                    <Link to={`${ROUTER.ADMIN_POS_DETAIL}${item.slug}`} >
                        <p><AiFillEdit /></p>
                    </Link>
                    <p onClick={() =>showPopupAdmin(item)}><AiFillDelete /></p>
                    <button onClick={() => handleAddNei({name: item.tags.name ||"Dịch vụ",villageId: villageCurrent.id, category: item.tags.amenity, geocode : [item.lat, item.lon]} )}>click</button>
                    
                </span>
            </div>
            ))
            }
        </body>
    </div>
  )
}
