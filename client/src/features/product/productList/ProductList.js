import React, { useContext, useState } from 'react';
import "./productList.scss";
import { Link, useParams } from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';
import { VillageContext } from '../../../shared/dataContext/VillageContext';

export default function ProductList({products}) {
    const {slug} = useParams()
    const {villages} = useContext(VillageContext)

    const [valueSearch , setValueSearch] = useState('')

  const productSearch = products.filter(product => product.name.toLowerCase().includes(valueSearch.toLowerCase()))

  const villageCurrent = villages.find(village => village.slug.trim() === slug)

  return (
    <div className='productList'>
        <div className='productList_path'>
            <section>
                <Link to={"/home"} className='productList_path-link'>
                    <p>Home</p>
                    <span> > </span>
                </Link>
                <Link to={`/village/${slug}`} className='productList_path-link'>
                    <p className='name_link'>{villageCurrent.name} </p>
                    <span> > </span>
                 </Link>
                <Link className='productList_path-link'>
                    <span className='product_link'>Sản phẩm </span>
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
