import React, { useContext, useEffect, useRef, useState } from 'react';
import "./avatar.scss";
import { AuthContext } from '../../shared/dataContext/AuthContext';
import { Link } from 'react-router-dom';
import { AVATAR_LINK } from '../../shared/constants/Constants';
import { VillageContext } from '../../shared/dataContext/VillageContext';

export default function Avatar() {
    const {userCurrent, setUserCurrent} = useContext(AuthContext)
    const {setIsLoading}  = useContext(VillageContext)

    const [isPopupUser, setIsPopupUser] = useState(false)

    const nameAvatar = userCurrent ? userCurrent?.email?.slice(0, 2).toUpperCase() : "ME"

    const popupRef = useRef(null)

    //check role user
    const FILTER_AVATAR_LINK = AVATAR_LINK.filter(item => item.role === process.env.REACT_APP_MEMBER)

    //click outside
    useEffect(() => {
        const handler = (e) => {
        if (popupRef?.current?.contains(e.target) === false) {
            setIsPopupUser(false);
        }
        };
        document.addEventListener('mousedown', handler);

        return () => {
        document.removeEventListener('mousedown', handler);
        };
    }, []);

    const handleClickLink = (name) => {
        setIsPopupUser(false)
        if(name === "LOGOUT") {
            setIsLoading(true)
            localStorage.removeItem('userIdFair');
            setUserCurrent({})
            setTimeout(() => {
                setIsLoading(false)
            }, 1500)
        }
    }

    return (
    <div className='avatar'>
        <section onClick={() => setIsPopupUser(true)}>{nameAvatar}</section>
        {
            isPopupUser && (
                <div ref={popupRef}>
                {
                    (userCurrent?.role === process.env.REACT_APP_MEMBER ? FILTER_AVATAR_LINK : AVATAR_LINK).map(item => (
                        <Link 
                            to={item.link} 
                            key={item.id} 
                            className='avatar_link' 
                            onClick={() => handleClickLink(item.name)}
                            style={{border: item.name === 'LOGOUT' ? 'none' : ''}}
                        >
                            {item.name}
                        </Link>
                    ))
                }
                </div>
            )
        }
    </div>
  )
}
