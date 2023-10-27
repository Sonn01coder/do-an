import React, { useContext, useState } from 'react'
import {AiFillHome} from 'react-icons/ai';
import {RiRunFill} from "react-icons/ri";
import {MdOutlineTour} from "react-icons/md";
import './villageDetail.scss';
import { Link, useParams } from 'react-router-dom';
import { VillageContext } from '../../shared/dataContext/VillageContext';
import { ProductContext } from '../../shared/dataContext/ProductContetx';
import { POIContext } from '../../shared/dataContext/PointOfInterestContext';
import { POSContext } from '../../shared/dataContext/PointOfServiceContext';

export default function VillageDetail() {
  const {villages} = useContext(VillageContext)
  const {products, setPopupProduct, popupProduct} = useContext(ProductContext)
  const { poi } = useContext(POIContext)
  const { pos } = useContext(POSContext)

  const path = useParams()

  //get village current
  const village = villages.find(village => village.slug.trim() === path.slug)

  //get product village
  const productVillage = products.filter(product => product.villageId === village.id) 

  //get poi village
  const poiVillage = poi.filter(item => item.villageId === village.id) 
  
  //get pos village
  const posVillage = pos.filter(item => item.villageId === village.id) 

  //more text history
  const [isMore, setIsMore]  = useState(false)

  //handle convert image from string to array
  const convertImage = (array, index) => {
    return JSON.parse(array)[index]
  }

  const handleHoverImage = (product) => {
    setPopupProduct({...popupProduct, isPopup: true, product: product})
  }

  return (
    <div className='villageDetail'>
        <div className='villageDetail_title'>
            <h1>{village.name}</h1>
            <section>
              <span> 
                <Link to='/tour'>
                  <MdOutlineTour />
                </Link>
                <div className='villageDetail_icon-tour-popup'>
                  <Link to="/tour" className='villageDetail_tour-popup-text' >Đăng kí tham gia tour </Link>
                </div>
              </span>
              <span>
                <Link to="/home" >
                  <AiFillHome />
                </Link>
              </span>
            </section>
        </div>

        <div className='villageDetail_content'>
          <div className='villageDetail_content-info'>
            <section>
              <h4>Địa chỉ: </h4>
              <p>{village.address}</p>
            </section>

            <section className='villageDetail_content-history'>
              <h4>Lịch sử ra đời: </h4>
              <p style={{maxHeight: isMore ? null : "100px"}} dangerouslySetInnerHTML={{ __html: village.history }}/>
            </section>

            <div className='villageDetail_content-more' onClick={() => setIsMore(!isMore)}>
              {
                isMore ? "Thu gọn" : "Xem thêm"
              }
            </div>

            <div className='villageDetail_content-info-img'> 
              <img src={convertImage(village.image, 0)} alt={village.name}/>
            </div>
          </div>

          <div className='villageDetail_content-product'>
            <div className='villageDetail_content-product-wrapper'>
              <div>
                <h4>Một số sản phẩm tiêu biểu: </h4>
              </div>
              <section>
              {
                productVillage.map(product => (
                  <Link 
                    to={`/village/${path.slug}/product/${product.slug}`}  
                    onMouseOver={() => handleHoverImage(product)} 
                    className='villageDetail_link-img'
                  >
                    <img src={convertImage(product.image, 0)} alt={product.name} />
                  </Link>
                ))
              }
              </section>
            </div>
          </div>


          <div className='villageDetail_content-place'>
            <h4>Các địa điểm tham quan làng</h4>
            <div className='villageDetail_content-place-wrapper'>
              {
                poiVillage.map(poi => (
                <Link to={`poi/${poi.slug}`} className='villageDetail_content-link-poi'>
                  <img src={convertImage(poi.image, 0)} alt={poi.name}/>
                  <p>{poi.name}</p>
                </Link>
                ))
              }
             
            </div>
          </div>

          <div className='villageDetail_content-proposed'>
            <h4>Một số địa diểm, dịch vụ lân cận được đề xuất:</h4>
            <div className='villageDetail_content-proposed-wrapper'>

            {
              posVillage.map(pos => (
                <section>
                  <h5>{pos.name}</h5>
                  <img src={convertImage(pos.image, 0)} alt='img'/>
                  <div>
                    <p>Trải nghiệm ngay</p>
                    <section><RiRunFill /></section>
                  </div>
                </section>
              ))
            }

            </div>
          </div>
        </div>
    </div>
  )
}
