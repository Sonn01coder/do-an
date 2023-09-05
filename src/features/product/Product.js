import React from 'react';
import './product.scss';
import ProductList from './productList/ProductList';
import ProdcutScreen from './productScreen/ProdcutScreen';

export default function Product() {
  return (
    <div className='product'>
      <div className='product_header'>
            <h2>LÀNG VIỆT</h2>
            <button>ĐĂNG KÍ THAM QUAN</button>
      </div>

      <div className='product_content'>
        <ProductList />
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
