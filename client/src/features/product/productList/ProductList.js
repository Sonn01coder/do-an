import React, { useState } from 'react';
import "./productList.scss";
import { Link, useParams } from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';

export default function ProductList({products}) {
    const {slug} = useParams()

    const [valueSearch , setValueSearch] = useState('')

  const productSearch = products.filter(product => product.name.toLowerCase().includes(valueSearch.toLowerCase()))


  return (
    <div className='productList'>
        <div className='productList_path'>
            <section>
                <Link to={"/home"}>
                    <p>Home > </p>
                </Link>
                <Link to={`/village/${slug}`}>
                    <p>Lang Bat Trang  > </p>
                </Link>
                <Link>
                    <p>San pham</p>
                </Link>
            </section>

            <span>
                <input 
                    type="text" 
                    placeholder='Tìm kiếm sản phẩm...' 
                    value={valueSearch}
                    onChange={e => setValueSearch(e.target.value)}
                />
                <p><BsSearch /></p>
            </span>
        </div>
        
        <div className='productList_wrapper'>
        {
            productSearch.length > 0 ? (
            productSearch.map(product => (
                    <Link to={product.slug} key={product.id} >
                    <div  className='productList_item' >
                        <img  src={JSON.parse(product.image)[0]} alt ="img" /> 
                        <p>{product.name}</p>
                    </div>
                </Link>
            ))) : (
                <p>Không có sản phẩm nào phù hợp</p>
            )
        }
        </div>
    </div>
  )
}
