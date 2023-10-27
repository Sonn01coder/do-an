import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./tour.scss";
import {FaPaperPlane} from "react-icons/fa";
import {BsSearch, BsArrowRight} from "react-icons/bs";
import { TourContext } from '../../shared/dataContext/TourContext';
import { AuthContext } from '../../shared/dataContext/AuthContext';
import Avatar from '../avatar/Avatar';

export default function Tour() {
  const {tours, placeTour} = useContext(TourContext) 
  const {userCurrent} = useContext(AuthContext)

  //filter place of tour
  const handlePlaceOfTour = (arr) => {
    const newArr = JSON.parse(arr)
    return  placeTour.filter(place => newArr.includes(place.id))
  }

  //handle render journey tour
  const handleRenderJourney = (arr) => {
    let renderedString = "Xuất phát từ ";

    for (let i = 0; i < arr.length; i++) {
      renderedString += arr[i].name;
      
      if(arr[i].name.includes("nhà hàng")) {
        renderedString += " ăn trưa"
      }

      if (i < arr.length - 2) {
        renderedString += ', đi đến ';
      } else if (i === arr.length - 2) {
        renderedString += ' và cuối cùng về ';
      }
    }
    
    renderedString += ".";

    return renderedString;
  }

  //handle slug tour
  const handleSlugTour = (string) => {
    return string.toLowerCase().replace(/\s+/g, "-")
  }

  //handle show email -> @
  const handelShowEmail = (email) => {
    const atIndex = email.indexOf('@');
    return email.substring(0, atIndex + 1); // Lấy cả kí tự @
  }
  return (
    <div className='tour'>
      <div className='tour_header'>
        <Link to={'/home'} >
            <h2>LÀNG VIỆT</h2>
        </Link>
        {
          Object.keys(userCurrent).length === 0  ? (
            <div>
              <Link to={"/login"}>
                <button>Đăng nhập</button>
              </Link>
    
              <Link to={"/register"}>
                <button>Đăng kí</button>
              </Link>
            </div>
          )  : (
            <div className='tour_header-avatar'>
              <Avatar />
              <p>{userCurrent.name || `${handelShowEmail(userCurrent.email)}...`}</p>
            </div>
          )
        }
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
          {
            tours.map(tour => (
                <div className='tour_item' key={tour.id}>
                  <div className='tour_item-content' key={tour.id}>
                    <h4>{tour.name}:</h4>
                    <p>{handleRenderJourney(handlePlaceOfTour(tour.placeId))}</p>
                  </div>
                  <Link className='tour_item-link' to={handleSlugTour(tour.name)}>
                    Xem chi tiết lô trình 
                    <span><BsArrowRight /></span>
                  </Link>
              </div>
              )) 
            }
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
