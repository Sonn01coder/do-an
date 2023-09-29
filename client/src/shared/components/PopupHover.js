import React, { useContext } from 'react'
import "../scss/components/popupHover.scss";
import {RxOpenInNewWindow} from "react-icons/rx"
import { ProductContext } from '../dataContext/ProductContetx';
import { Link, useNavigation, useParams } from 'react-router-dom';

export default function PopupHover() {
  const {popupProduct, setPopupProduct} = useContext(ProductContext)

  const product = popupProduct.product

  return (
    <div className='popupHover'>
      <Link to={`product/${product.slug}`} onClick={() =>setPopupProduct({...popupProduct, isPopup: false, product: product}) } className='popupHover_icon'><RxOpenInNewWindow /></Link>
      <h3>{product.name}</h3>
      <img src={JSON.parse(product.image)[0]} alt={product.name} />
      <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
    </div>
  )
}
