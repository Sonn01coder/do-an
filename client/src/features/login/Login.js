import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./login.scss";
import img from "../../shared/assest/image/img_login.jpg";
import {ImArrowRight2} from 'react-icons/im';
import { validationLogin } from '../../shared/validation';
import { AuthContext } from '../../shared/dataContext/AuthContext';
import { VillageContext } from '../../shared/dataContext/VillageContext';

export default function Login() {

    const {registerUser, loginUser, userCurrent} = useContext(AuthContext)

    const {setIsLoading} = useContext(VillageContext)
    
    const [formData, setFormData] = useState({email:'', password:'', confirmPassword:''});

    const [error, setError] = useState({email: '', password: '', confirmPassword: ''})

    const location = useLocation()

    const navigate = useNavigate()
    
    const isLogin = location.pathname === "/login"

    //handle logic login user
    const handleLogicLogin = async () => {
        const res = await loginUser({email:formData.email, password: formData.password})
        if(res?.status === 200) {
            setTimeout(() => {
                setIsLoading(false)
                navigate('/home')
                setFormData({email: '', password: '', confirmPassword: ''})
            }, 2000)
        }
    }

    console.log(!(Object.keys(userCurrent).length === 0))

    useEffect(() => {
        if(!(Object.keys(userCurrent).length === 0)) {
            console.log("login");
            navigate('/home')
        }
      }, [Object.keys(userCurrent).length === 0])

    //handle logic register account
    const handleLogicRegister = async () => {
        const res = await registerUser({email: formData.email, password: formData.password})
        if(res?.status === 201) {
            setTimeout(() => {
                setIsLoading(false)
                navigate('/myaccount/user')
                setFormData({email: '', password: '', confirmPassword: ''})
            }, 2000)
        }
    }

    //button login or register
    const handleLoginAndRegister = () => {
        if(isLogin) {
            handleLogicLogin()
        } else {
            handleLogicRegister()
        }
    }

    //validation form login
    const validations = validationLogin(formData.email, formData.password, formData.confirmPassword)


    //check disabled button login
    const isDisabled = isLogin ? (validations.email === undefined && validations.password  === undefined) 
                    : (validations.email === undefined && validations.password  === undefined && validations.confirmPassword === undefined)

  return (
    <div className='login'>
        <div className='login_header'>
            <Link to={'/home'} >
                <h2>LÀNG VIỆT</h2>
            </Link>
        </div>

        <div className='login_content' style={{backgroundImage: `url(${img})`}}>
            <div className='login_content-container'>
                <h2>{isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}</h2>

                <div className='login_content-container-wrapper'>
                    <div className='login_input-wrapper'>
                        <div className='login_input'>
                            <p>Email</p>
                            <input 
                                type='email' 
                                placeholder='Nhập địa chỉ email của bạn' 
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                onBlur={() => setError({...error, email: validationLogin(formData.email, formData.password, formData.confirmPassword).email})}
                            />
                            {error.email  && <span className='login_error'>{error.email}</span>}
                        </div>

                        <div className='login_input'>
                            <p>Password</p>
                            <input 
                                type='password' 
                                placeholder='Nhập mật khẩu của bạn'
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})} 
                                onBlur={() => setError({...error, password: validationLogin(formData.email, formData.password, formData.confirmPassword).password})}
                            />
                            {error.password  && <span className='login_error'>{error.password}</span>}
                        </div>
                        {
                            !isLogin ? (
                                <div className='login_input'>
                                    <p>Confirm Password</p>
                                    <input 
                                        type='password' 
                                        placeholder='Xác nhận lại mật khẩu của bạn'
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                                        onBlur={() => setError({...error, confirmPassword: validationLogin(formData.email, formData.password, formData.confirmPassword).confirmPassword})}
                                    />
                                    {error.confirmPassword  && <span className='login_error'>{error.confirmPassword}</span>}
                                </div>
                            ) : null
                        }

                    </div>
                    
                    <button onClick={handleLoginAndRegister} className={!isDisabled ? "btn-disabled" : ""}>
                        <ImArrowRight2 />
                    </button>
                </div>

                {
                    isLogin ? (
                        <div className='login_content-footer'>
                            <Link to={"/register"} className='login_content-footer-link'>If you don't have account</Link>
                            <Link className='login_content-footer-link'>Forgot password</Link>
                        </div>
                    ) : (
                        <div className='login_content-footer'>
                            <Link to={'/login'} className='login_content-footer-link'>If you have account</Link>
                        </div>
                    )
                }
            </div>
        </div>  
    </div>
  )
}
