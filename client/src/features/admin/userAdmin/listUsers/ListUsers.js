import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TourContext } from '../../../../shared/dataContext/TourContext'
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { ROUTER } from '../../../../shared/constants/Constants';
import { AuthContext } from '../../../../shared/dataContext/AuthContext';

export default function ListUser() {
  const {users, members, userCurrent} = useContext(AuthContext)

  const {setPopupAdmin} = useContext(TourContext)

  const showPopupAdmin = (item) => {
    setPopupAdmin({id: item.id, isPopup: true, content: `User ${item.email}`, category: "user"})
  }

  
  const newUsers = userCurrent?.role === process.env.REACT_APP_ADMIN ? members 
                    : userCurrent?.role === process.env.REACT_APP_SUPER_USER ? users 
                    : []

  return (
    <div className='listTour_admin'>
        <div className='listTour_admin-title'>
            <section>Id</section>
            <section>Role</section>
            <section>Email</section>
        </div>

        <body className='listTour_admin-body'>
        {
            newUsers.length > 0 && (
                newUsers.map(user => (
                <div key={user.id}>
                    <section>{user.id}</section>
                    <section>{user.role}</section>
                    <section className='item-flex-start'>{user.email}</section>
                    <span>
                        <Link to={`${ROUTER.ADMIN_USER_DETAIL}${user.id}`} >
                            <p><AiFillEdit /></p>
                        </Link>
                        <p onClick={() =>showPopupAdmin(user)}><AiFillDelete /></p>
                    </span>
                </div>
                )))
            }
        </body>
    </div>
)
}
