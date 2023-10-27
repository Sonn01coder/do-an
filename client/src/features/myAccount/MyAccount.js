import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import "./myAccount.scss";
import { LIST_SIDEBAR_MYACCOUNT } from '../../shared/constants/Constants';
import Profile from './profile/Profile';
import HistoryTour from './historyTour/HistoryTour';
import { AuthContext } from '../../shared/dataContext/AuthContext';

export default function MyAccount() {

  const {slug} = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { userCurrent } = useContext(AuthContext)

  useEffect(() => {
    if(Object.keys(userCurrent).length === 0) {
        navigate('/login')
    }
  }, [Object.keys(userCurrent)?.length === 0])

  return (
    <div className='myAccount'>
        <div className='myAccount_header'>
            <Link to={'/home'} >
                <h2>LÀNG VIỆT</h2>
            </Link>
        </div>

        <div className='myAccount_content'> 
            <div className='myAccount_content-wrapper'>  
                <div className='myAccount_content-wrapper-sidebar'>
                    {
                        LIST_SIDEBAR_MYACCOUNT.map(item => (
                            <Link 
                                className={`myAccount_sidebar-link ${location.pathname === item.path ? "sidebar_active" : ""}`}
                                to={item.path}
                                key={item.id}
                            >
                                {item.name}
                            </Link>
                        ))
                    }
                </div>

                <div className='myAccount_content-wrapper-contents'>
                    {
                        slug === "profile" ? <Profile /> 
                        : slug === "history-tour" ? <HistoryTour />
                        : <div>404</div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
