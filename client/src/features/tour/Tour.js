import React from 'react';
import { Link } from 'react-router-dom';
import "./tour.scss";
import {FaPaperPlane} from "react-icons/fa";
import {BsSearch, BsArrowRight} from "react-icons/bs";

export default function Tour() {
  return (
    <div className='tour'>
      <div className='tour_header'>
        <Link to={'/home'} >
            <h2>LÀNG VIỆT</h2>
        </Link>

        <div>
          <Link to={"/login"}>
            <button>Đăng nhập</button>
          </Link>

          <Link to={"/register"}>
            <button>Đăng kí</button>
          </Link>
        </div>
      </div>

      <div className='tour_content'>
        <div className='tour_content-wrapper'>
          <div className='tour_content-wrapper-navigate'>
            <section>
              <Link to={'/home'}>
                Trang chủ
              </Link>
              <p> {'>'} Tour</p>
            </section>

            <div className='tour_content-input'>
              <input type='text' placeholder="Nhập từ khóa tìm kiếm của bạn" />
              <span><BsSearch /></span>
            </div>
          </div>

          <div className='tour_list'>
            <div className='tour_item'>
              <div className='tour_item-content'>
                <h4>Tour 1:</h4>
                <p>Từ diểm xuất phát đi làng Bát Tràng, tiếp đó đến thành Cổ Loa và thăm quan đền An Dương Vương</p>
              </div>

              <Link className='tour_item-link'>
                Xem chi tiết lô trình 
                <span><BsArrowRight /></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='tour_footer'>
        <div className='tour_footer-contact'>
          <h4>Contact:</h4>
          <p>Phone: 0123456789</p>
          <p>Email: abcxyz@gmail.com</p>
          <p>Address: 133 Xuân Thủy, Cầu Giấy, Hà Nội</p>
        </div>

        <div className='tour_footer-email'>
          <h4>Đăng kí để nhận các thông tin ưu đãi mới nhất của chúng tôi</h4>
          <section>
            <input type="text" placeholder="Nhập địa chỉ email của bạn" />
            <span><FaPaperPlane /></span>
          </section>
        </div>
      </div>
    </div>
  )
}
