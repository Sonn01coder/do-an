import React from 'react'
import {AiFillHome} from 'react-icons/ai';
import {TiWeatherCloudy} from "react-icons/ti";
import img from '../../shared/assest/image/bat-trang/lang.jpeg';
import {BsChevronDoubleDown} from "react-icons/bs";
import {RiRunFill} from "react-icons/ri"
import './villageDetail.scss';

export default function VillageDetail() {
  return (
    <div className='villageDetail'>
        <div className='villageDetail_title'>
            <h1>Làng Bát Tràng</h1>
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
              <p>Xã Bát Tràng, Gia Lâm, Hà Nội</p>
            </section>

            <section className='villageDetail_content-history'>
              <h4>Lịch sử ra đời: </h4>
              <p>Lang được hình thành vào thế kỷ 
              XIV - XV, vào thời nhà Lý. Sự ra đời của làng nghề gốm Bát Tràng Hà Nội này là do 5 dòng họ gốm nổi tiếng bao gồm  họ Trần, Vương, Nguyễn, Lê, Phạm đã đưa các nghệ nhân làm gốm về kinh thành 
              Thăng Long để phát triển  ày được hình thành vào thế kỷ 
              XIV - XV, vào thời nhà Lý. Sự ra đời của làng nghề gốm Bát Tràng Hà Nội này là do 5 dòng họ gốm nổi tiếng bao gồm  họ Trần, Vương, Nguyễn, Lê, Phạm đã đưa các nghệ nhân làm gốm về kinh thành 
              Thăng Long để phát triển  ày được hình thành vào thế kỷ 
              XIV - XV, vào thời nhà Lý. Sự ra đời của làng nghề gốm Bát Tràng Hà Nội này là do 5 dòng họ gốm nổi tiếng bao gồm  họ Trần, Vương, Nguyễn, Lê, Phạm đã đưa các nghệ nhân làm gốm về kinh thành 
              Thăng Long để phát triển  ày được hình thành vào thế kỷ 
              XIV - XV, vào thời nhà Lý. Sự ra đời của làng nghề gốm Bát Tràng Hà Nội này là do 5 dòng họ gốm nổi tiếng bao gồm  họ Trần, Vương, Nguyễn, Lê, Phạm đã đưa các nghệ nhân làm gốm về kinh thành 
              Thăng Long để phát triển </p>
            </section>

            <div className='villageDetail_content-more'>Xem thêm</div>

            <div className='villageDetail_content-info-img'> 
              <img src={img} alt='img'/>
              <img src={img} alt='img'/>
            </div>
          </div>

          <div className='villageDetail_content-product'>
            <div className='villageDetail_content-product-wrapper'>
              <div>
                <h4>Sản phẩm: </h4>
                <p>Gốm Mỹ Nghệ</p>
              </div>

              <section>
                <img src={img} alt='img'/>
                <img src={img} alt='img'/>
                <img src={img} alt='img'/>
              </section>

              <span></span>

            </div>
            <section className='villageDetail_content-product-more'><BsChevronDoubleDown /></section>
          </div>


          <div className='villageDetail_content-place'>
            <h4>Các địa điểm tham quan làng</h4>
            <div className='villageDetail_content-place-wrapper'>
              <div>
                <img src={img} alt='img'/>
                <p>Làng cổ Bát Tràng</p>
              </div>
              <div>
                <img src={img} alt='img'/>
                <p>Chợ gốm Bát Tràng</p>
              </div>
              <div>
                <img src={img} alt='img'/>
                <p>Chợ gốm Bát Tràng</p>
              </div>
              <div>
                <img src={img} alt='img'/>
                <p>Chợ gốm Bát Tràng</p>
              </div>
              <div>
                <img src={img} alt='img'/>
                <p>Chợ gốm Bát Tràng</p>
              </div>
            </div>
          </div>

          <div className='villageDetail_content-proposed'>
            <h4>Một số địa diểm, dịch vụ lân cận được đề xuất:</h4>
            <div className='villageDetail_content-proposed-wrapper'>
              <section>
                <h5>Quán cafe Điện Báo</h5>
                <img src={img} alt='img'/>
                <div>
                  <p>Trải nghiệm ngay</p>
                  <section><RiRunFill /></section>
                </div>
              </section>

              <section>
              <h5>Quán cafe Điện Báo</h5>
              <img src={img} alt='img'/>
              <div>
                <p>Trải nghiệm ngay</p>
                <section><RiRunFill /></section>
              </div>
            </section>

            <section>
            <h5>Quán cafe Điện Báo</h5>
            <img src={img} alt='img'/>
            <div>
              <p>Trải nghiệm ngay</p>
              <section><RiRunFill /></section>
            </div>
          </section>

          <section>
          <h5>Quán cafe Điện Báo</h5>
          <img src={img} alt='img'/>
          <div>
            <p>Trải nghiệm ngay</p>
            <section><RiRunFill /></section>
          </div>
        </section>
            </div>
          </div>
        </div>
    </div>
  )
}
