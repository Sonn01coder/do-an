import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ROLE_USER, TITLE_ADMIN } from '../../../../shared/constants/Constants'
import {FaCloudUploadAlt} from "react-icons/fa"
import {FiPlusCircle} from "react-icons/fi"
import { AuthContext } from '../../../../shared/dataContext/AuthContext'
import { VillageContext } from '../../../../shared/dataContext/VillageContext'

export default function CreateAndEditUser() {
    const { users, updateRoleUser, registerUser  } = useContext(AuthContext)

    const {villages} = useContext(VillageContext)
    //slug path
    const {slug} = useParams()

    // show popup role
    const [isPopupRole, setIsPopupRole] = useState(false)

    //filter
    const userDetail = users.find(user => user.id === Number(slug))

    //handle check village current
    const handleVillageCurrent = (role) => {
        if(role.includes(process.env.REACT_APP_VILLAGE_USER)) {
            let villageId = role.match(/\d+/)[0];
            return villages.find(village => village.id === Number(villageId))
        }
        return undefined
    }

    //value  form
    const [valueForm, setValueForm] = useState({role: userDetail?.role || '', village: userDetail?.role && handleVillageCurrent(userDetail?.role) !== undefined ?  handleVillageCurrent(userDetail?.role).name : "" ,email: userDetail?.email || "", villageId: userDetail?.role && handleVillageCurrent(userDetail?.role) !== undefined ?  handleVillageCurrent(userDetail?.role).id : 0})

    //show popup 
    const [isPopupVillage, setIsPopupVillage] = useState(false)

    //value filter
    const [valueFilter, setValueFilter] = useState("")

    const handleSaveTour = () => {
        if(slug) {
            void updateRoleUser({id: userDetail.id, role: valueForm.role === process.env.REACT_APP_VILLAGE_USER ? `${valueForm.role}_${valueForm.villageId}` : valueForm.role})
        } else {
            void registerUser({email: valueForm.email, password: valueForm.email, role: valueForm.role})
        }
    }

    const popupVillageRef = useRef(null)
    const popupRoleRef = useRef(null)

    const handlePickRole = (role) => {
        setValueForm({...valueForm, role: role})
        setIsPopupRole(false)
    }

    const handlePickVillage = (village) => {
        console.log(village);
        setValueForm({...valueForm,role:process.env.REACT_APP_VILLAGE_USER, village: village.name, villageId: village.id})
        setIsPopupVillage(false)
    }

    //click outside
    useEffect(() => {
        const handler = (e) => {
          if (popupRoleRef?.current?.contains(e.target) === false) {
            setIsPopupRole(false);
          }

          if (popupVillageRef?.current?.contains(e.target) === false) {
            setIsPopupVillage(false);
          }
        };
        document.addEventListener('mousedown', handler);
    
        return () => {
          document.removeEventListener('mousedown', handler);
        };
    }, []);

  return (
    <div className='createAndEditTour'>
        <div className='createAndEditTour_title'>
            <h2>{slug ? TITLE_ADMIN.USER.EDIT: TITLE_ADMIN.USER.CREATE}</h2>
            <section onClick={handleSaveTour}><FaCloudUploadAlt /></section>
        </div>  

        <div className='createAndEditTour_content'>
            <div className='createAndEditTour_input'>
                <h4>Email</h4>
                <input 
                    type='text' 
                    placeholder='email' 
                    value={valueForm.email}
                    onChange={e => setValueForm({...valueForm, email: e.target.value})}
                />
            </div>

            <div className='createAndEditTour_input'>
                <h4>Role</h4>
                <div className='createAndEditTour_input-role'>
                    <input 
                        type='text' 
                        placeholder='role' 
                        value={valueForm.role}
                        onClick={() => setIsPopupRole(true)}
                    />
                    {
                        isPopupRole && (
                            <div className='popup-role' ref={popupRoleRef}>
                                {
                                    ROLE_USER.map(role => (
                                        <section onClick={() => handlePickRole(role.role)}  key={role.id}>{role.role}</section>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>

            {
                valueForm.role.includes(process.env.REACT_APP_VILLAGE_USER) ? (
                    <div className='createAndEditTour_journey'>
                        <h4>Village</h4>
                        <div className='createAndEditTour_journey-add'>
                            {
                                    <div className='createAndEditTour_input-wrapper'>
                                        <input  
                                            type='text'
                                            placeholder='village'
                                            value={valueForm.village}
                                            onClick={() => setIsPopupVillage(true)}
                                        />
                                        {
                                            isPopupVillage && (
        
                                                <div className='createAndEditTour_input-wrapper-popup' ref={popupVillageRef}>
                                                    <input 
                                                        type='text' 
                                                        placeholder='keywords filter' 
                                                        value={valueFilter}
                                                        onChange={e => setValueFilter(e.target.value)}
                                                    />
                                                    <body>
                                                    {
                                                        villages.map(village => (
                                                            <div key={village.id} onClick={() => handlePickVillage(village)}>
                                                                <p>{village.name}</p>
                                                                <span><FiPlusCircle /></span>
                                                            </div>
                                                        ))
                                                    }
                                                    </body>
                                                </div>
                                            )
                                        }
        
                                    </div>
                            }
                        </div>
                    </div>
                ) : null
            }

        </div>
    </div>
  )
}
