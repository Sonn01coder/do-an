import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductContext } from '../../../shared/dataContext/ProductContetx';
import "./productScreen.scss";
import { VillageContext } from '../../../shared/dataContext/VillageContext';

export default function ProductScreen() {
  const {products} = useContext(ProductContext)
  const {villages} = useContext(VillageContext)
  
  const {slug, path} = useParams()

  const product = products.find(product => product.slug.trim() === path)
  
  const villageCurrent = villages.find(village => village.id === product.villageId)

  const listProduct = products.filter(item => item.villageId === villageCurrent.id && item.id !== product.id)
  
  return (
    <div className='productScreen'>
      <div className='productScreen_path'>
          <Link to={"/home"} className='productScreen_path-link'>
            <p>Home</p>
            <span> > </span>
          </Link>
          <Link to={`/village/${slug}`} className='productScreen_path-link'>
            <p>Lang Bat Trang   </p>
            <span> > </span>
          </Link>
          <Link to={`/village/${slug}/product`} className='productScreen_path-link'>
            <p>San pham</p>
            <span> > </span>
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
          <section>
          {
            listProduct.map(product => (
              <Link className='product_wrapper-footer-item' to={`/village/${slug}/product/${product.slug}`}>
                <img  src={JSON.parse(product.image)[0]} alt={product.name} />
                <p>{product.name}</p>
              </Link>
            ))
          }
            
          </section>
        </div>
      </div>
    </div>
  )
}
