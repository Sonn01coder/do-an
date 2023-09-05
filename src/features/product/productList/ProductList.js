import React from 'react';
import "./productList.scss";
import { Link } from 'react-router-dom';
import img from "../../../shared/assest/image/bat-trang/lang.jpeg";

export default function ProductList() {
  return (
    <div className='productList'>
        <div className='productList_path'>
            <Link>
                <p>Home > </p>
            </Link>
            <Link>
                <p>Lang Bat Trang > </p>
            </Link>
            <Link>
                <p>San pham</p>
            </Link>
        </div>
        
        <div className='productList_wrapper'>
            <div className='productList_item'>
                <img  src={img} alt ="img" /> 
                <p>Ấm chén rạng đông làng Bát Tràng</p>
            </div>

            <div className='productList_item'>
                <img  src={img} alt ="img" /> 
                <p>Ấm chén rạng đông làng Bát Tràng</p>
            </div>

            <div className='productList_item'>
                <img  src={img} alt ="img" /> 
                <p>Ấm chén rạng đông làng Bát Tràng</p>
            </div>

            <div className='productList_item'>
                <img  src={img} alt ="img" /> 
                <p>Ấm chén rạng đông làng Bát Tràng</p>
            </div>
            <div className='productList_item'>
                <img  src={img} alt ="img" /> 
                <p>Ấm chén rạng đông làng Bát Tràng</p>
            </div>

        </div>
    </div>
  )
}
