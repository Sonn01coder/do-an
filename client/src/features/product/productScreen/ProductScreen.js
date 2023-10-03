import React, { useContext, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductContext } from '../../../shared/dataContext/ProductContetx';
import { VillageContext } from '../../../shared/dataContext/VillageContext';
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
import "./productScreen.scss";
import { SmoothHorizontalScrolling } from '../../../shared/hook/useSrcollX';

export default function ProductScreen() {
  const {products} = useContext(ProductContext)
  const {villages} = useContext(VillageContext)

  const sliderRef = useRef(null)
  const itemRef = useRef(null)
  
  const {slug, path} = useParams()

  const product = products.find(product => product.slug.trim() === path)
  
  const villageCurrent = villages.find(village => village.id === product.villageId)

  const listProduct = products.filter(item => item.villageId === villageCurrent.id && item.id !== product.id)

  const handleScrollRight = () => {
    const maxScrollLeft =  sliderRef.current.scrollWidth - sliderRef.current.clientWidth
    if(sliderRef.current.scrollLeft < maxScrollLeft) {
        SmoothHorizontalScrolling(sliderRef.current,
            280,
            itemRef.current.clientWidth,
            sliderRef.current.scrollLeft)
    }
}

const handleScrollLeft = () => {
    if(sliderRef.current.scrollLeft > 0) {
        SmoothHorizontalScrolling(sliderRef.current,
            280,
            -itemRef.current.clientWidth,
            sliderRef.current.scrollLeft)
    }
}
  
  return (
    <div className='productScreen'>
      <div className='productScreen_path'>
          <Link to={"/home"} className='productScreen_path-link'>
            <p>Home</p>
            <span>{' >'} </span>
          </Link>
          <Link to={`/village/${slug}`} className='productScreen_path-link'>
            <p>{villageCurrent.name} </p>
            <span> {'>'} </span>
          </Link>
          <Link to={`/village/${slug}/product`} className='productScreen_path-link'>
            <p>Sản phẩm </p>
            <span>{' >'} </span>
          </Link>
              <p>{product.name}</p>
      </div>

      <div className='productScreen_wrapper'>
        <div className='productScreen_wrapper-content'>
          <img src={JSON.parse(product.image)[0]} alt={product.name} />
          <section>
            <h1>{product.name}</h1>
            <h4>Mô tả: </h4>
            <p dangerouslySetInnerHTML={{ __html: product.description}}/>
          </section>
        </div>

        <div className='productScreen_wrapper-footer'>
          <h3>CÁC SẢN PHẨM KHÁC CỦA {villageCurrent.name.toUpperCase()} :</h3>
          {
            listProduct.length > 0 ? (
              <section ref={sliderRef}>
              {
                listProduct.map(product => (
                  <Link className='product_wrapper-footer-item' to={`/village/${slug}/product/${product.slug}`} ref={itemRef}>
                    <img  src={JSON.parse(product.image)[0]} alt={product.name} />
                    <p>{product.name}</p>
                  </Link>
                ))
              }
              </section>
              ) : (
                <section>Không còn sản phẩm khác của làng</section>
                )
              }
          {
            listProduct.length > 5 &&  (
                <button className='product_wrapper-footer-left' onClick={handleScrollLeft}><AiOutlineLeft /></button>
              )
          }
          {
            listProduct.length > 5 &&  (
                <button className='product_wrapper-footer-right' onClick={handleScrollRight}><AiOutlineRight /></button>
              )
          }
        </div>
      </div>
    </div>
  )
}
