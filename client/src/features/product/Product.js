import React, { useContext } from 'react';
import './product.scss';
import ProductList from './productList/ProductList';
import { Link, useParams } from 'react-router-dom';
import { VillageContext } from '../../shared/dataContext/VillageContext';
import { ProductContext } from '../../shared/dataContext/ProductContetx';
import ProductScreen from './productScreen/ProductScreen';

export default function Product() {
  const {slug, path} = useParams()
  const {villages} = useContext(VillageContext)
  const {products} = useContext(ProductContext)

  const village = villages.find(village => village.slug === slug)
  
  const productVillage = products.filter(product => product.villageId === village.id)

  return (
    <div className='product'>
      <div className='product_header'>
            <Link to={'/home'} >
              <h2>LÀNG VIỆT</h2>
            </Link>
            <button>ĐĂNG KÍ THAM QUAN</button>
      </div>

      <div className='product_content'>
      {
        !path ?  <ProductList products={productVillage}/> : <ProductScreen />
      }
      </div>
    
      <div className='product_footer'>
        <div>
            <p>Phone: 0123456789</p>
            <p>Mail: abcxyz@gmail.com</p>
        </div>

        <div>Address: 133 Xuan Thuy, Cau Giay, Ha Noi</div>
      </div>
    </div>
  )
}
