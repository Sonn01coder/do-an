import React, { useContext } from 'react'
import "../scss/components/popupAdmin.scss";
import {AiOutlineDelete} from 'react-icons/ai'
import { VillageContext } from '../dataContext/VillageContext';
import { ProductContext } from '../dataContext/ProductContetx';
import {POSContext} from '../dataContext/PointOfServiceContext';
import { POIContext } from '../dataContext/PointOfInterestContext';


export default function PopupAdmin() {
  const { deleteVillage, popupAdmin , setPopupAdmin} = useContext(VillageContext)
  const { deleteProduct} = useContext(ProductContext)
  const { deletePos} = useContext(POSContext)
  const { deletePoi} = useContext(POIContext)

  const handleRemove = () => {
    if(popupAdmin.category === "village") {
      void deleteVillage(popupAdmin.id)
    } else if(popupAdmin.category === "product") {
      void deleteProduct(popupAdmin.id)
    } else if(popupAdmin.category === "pos") {
      void deletePos(popupAdmin.id)
    } else if(popupAdmin.category === "poi") {
      void deletePoi(popupAdmin.id)
    }
    setPopupAdmin({isPopup: false, content: "", id: 0, category: ""})
  }
  

  return (
    <div className='popupAdmin'>
        <div className='popupAdmin_container'>
            <div className='popupAdmin_container-content'>
                <section><AiOutlineDelete /></section>
                <h3>Are you sure you want to delete {popupAdmin.content}?</h3>
            </div>
            <div className='popupAdmin_container-button'>
                <button onClick={handleRemove}>Yes</button>
                <button onClick={() => setPopupAdmin({isPopup: false, content: "", id: 0, category: ""})}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
