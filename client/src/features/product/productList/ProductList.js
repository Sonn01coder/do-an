import React from 'react';
import "./productList.scss";
import { Link, useParams } from 'react-router-dom';

export default function ProductList({products}) {
    const {slug} = useParams()

  return (
    <div className='productList'>
        <div className='productList_path'>
            <Link to={"/home"}>
                <p>Home > </p>
            </Link>
            <Link to={`/village/${slug}`}>
                <p>Lang Bat Trang  > </p>
            </Link>
            <Link>
                <p>San pham</p>
            </Link>
        </div>
        
        <div className='productList_wrapper'>
        {
            products.map(product => (
                    <Link to={product.slug} key={product.id} >
                    <div  className='productList_item' >
                        <img  src={JSON.parse(product.image)[0]} alt ="img" /> 
                        <p>{product.name}</p>
                    </div>
                </Link>
            ))
        }
        </div>
    </div>
  )
}
