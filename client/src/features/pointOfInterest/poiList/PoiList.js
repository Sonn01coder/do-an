import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';

export default function PoiList({poiVillage, village}) {
    const {slug} = useParams()

    const [valueSearch , setValueSearch] = useState('')

  const poiSearch = poiVillage.filter(item => item.name.toLowerCase().includes(valueSearch.toLowerCase()))


  return (
    <div className='productList'>
        <div className='productList_path'>
            <section>
                <Link to={"/home"} className='productList_path-link'>
                    <p>Home </p>
                    <span>{' > '}</span>
                </Link>
                <Link to={`/village/${slug}`} className='productList_path-link'>
                    <p>{village.name}</p>
                    <span> {' > '}</span>
                </Link>
                <Link>
                    <p>Địa điểm tham quan</p>
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
            poiSearch.length > 0 ? (
            poiSearch.map(product => (
                <Link to={product.slug} key={product.id} >
                    <div  className='productList_item' >
                        <img  src={JSON.parse(product.image)[0]} alt ="img" /> 
                        <p>{product.name}</p>
                    </div>
                </Link>
            ))) : (
                <p>Không có đia điểm nào phù hợp</p>
            )
        }
        </div>
    </div>
  )
}
