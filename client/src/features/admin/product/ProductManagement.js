import React, { useContext, useEffect, useRef, useState } from 'react'
import {AiFillCaretDown} from "react-icons/ai"
import {BsSearch} from "react-icons/bs";
import { ROUTER, showListLength } from '../../../shared/constants/Constants'
import { Link, useLocation } from 'react-router-dom'
import './productManagement.scss';
import ProductsAll from './productList/ProductList';
import CreateAndEditProduct from './createAndEditProduct/CreateAndEditProduct';
import { ProductContext } from '../../../shared/dataContext/ProductContetx';

export default function ProductManagement() {
  const [listLength, setListLength] = useState(showListLength[0].length)
  const [openPopup, setOpenPopUp] = useState(false)

  const [valueSearch, setValueSearch] = useState("")

  const {products} = useContext(ProductContext)

  const [newProducts, setNewProducts] = useState(products)

  const productSearch = products.filter(product => product.name.toLowerCase().includes(valueSearch.toLowerCase()))

  const popUpRef = useRef()

  //get current param
  const location = useLocation()

  //handle pick length show data
  const handlePickLength = (length) => {
    setListLength(length)
    setOpenPopUp(false)
  }

  useEffect(() => {
    if(listLength < products.length) {
      const newArr = products.slice(0, listLength)
      setNewProducts(newArr)
    } else {
      setNewProducts(productSearch)
    }
  }, [listLength])

  //click outside
  useEffect(() => {
    const handler = (e) => {
      if (popUpRef?.current?.contains(e.target) === false) {
        setOpenPopUp(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <section className='productManagement'>
    {
        !(location.pathname.includes(ROUTER.ADMIN_PRODUCT_CREATE) || location.pathname.includes(ROUTER.ADMIN_PRODUCT_DETAIL) ) ? 
        (
          <div className='productManagement_body'>
             <div className='productManagement_body-header'>
                 <div className='productManagement_body-header-show'>
                   <div className='productManagement_body-header-show-option' onClick={() => setOpenPopUp(true)}>
                       <p>Show {listLength}</p>
                       <section><AiFillCaretDown/></section>
                   </div>
                   {
                     openPopup && (
                         <section className='productManagement_body-header-show-popup' ref={popUpRef}>
                             {
                                 showListLength.map( item =>
                                     <p key={item.id} onClick={() => handlePickLength(item.length)}>{item.length}</p>
                                 )
                             }
                         </section>
                     )
                   }
                 </div>
   
                 <div className='productManagement_body-header-search'>
                   <Link to={ROUTER.ADMIN_PRODUCT_CREATE}><button>Create</button></Link>
                   <input type="text"  placeholder='Nhập từ khóa tìm kiếm' value={valueSearch} onChange={e => setValueSearch(e.target.value)}/>
                   <section><BsSearch /></section>
                 </div>
             </div>
   
             <div className='productManagement_list_admin'>
                <ProductsAll products={newProducts.length >0 ? newProducts : productSearch} />
             </div>
           </div>   
        ) : (
          <div className='productManagement_body'>
              <CreateAndEditProduct />
          </div> 
        )
      }
    </section>
  )
}
