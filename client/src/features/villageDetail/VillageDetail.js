import React, { useContext } from 'react'
import {AiFillHome} from 'react-icons/ai';
import {TiWeatherCloudy} from "react-icons/ti";
import {BsChevronDoubleDown} from "react-icons/bs";
import {RiRunFill} from "react-icons/ri"
import './villageDetail.scss';
import { Link, useParams } from 'react-router-dom';
import { VillageContext } from '../../shared/dataContext/VillageContext';
import { ProductContext } from '../../shared/dataContext/ProductContetx';
import { POIContext } from '../../shared/dataContext/PointOfInterestContext';
import { POSContext } from '../../shared/dataContext/PointOfServiceContext';

export default function VillageDetail() {
  const {villages} = useContext(VillageContext)
  const {products} = useContext(ProductContext)
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
  

  //handle convert image from string to array
  const convertImage = (array, index) => {
    return JSON.parse(array)[index]
  }
  return (
    <div className='villageDetail'>
        <div className='villageDetail_title'>
            <h1>{village.name}</h1>
            <section>
              <span>
                <TiWeatherCloudy />
              </span>
              <span>
                <AiFillHome />
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
              <p dangerouslySetInnerHTML={{ __html: village.history }}/>
            </section>

            <div className='villageDetail_content-more'>Xem thêm</div>

            <div className='villageDetail_content-info-img'> 
              <img src={convertImage(village.image, 0)} alt={village.name}/>
            </div>
          </div>

          <div className='villageDetail_content-product'>
            <div className='villageDetail_content-product-wrapper'>
              <div>
                <h4>Sản phẩm: </h4>
                <p>Gốm Mỹ Nghệ</p>
              </div>

              <section>
              <img src={convertImage(productVillage[0].image, 0)} alt={village.name}/>
              <img src={convertImage(productVillage[1].image, 0)} alt={village.name}/>
              </section>

              <span></span>

            </div>
            
            <Link to={"product"}>
              <section className='villageDetail_content-product-more'><BsChevronDoubleDown /></section>
            </Link>
          </div>


          <div className='villageDetail_content-place'>
            <h4>Các địa điểm tham quan làng</h4>
            <div className='villageDetail_content-place-wrapper'>
              {
                poiVillage.map(poi => (
                <div>
                  <img src={convertImage(poi.image, 0)} alt={poi.name}/>
                  <p>{poi.name}</p>
                </div>
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
