import { createContext, useContext, useEffect, useState } from "react";
import {ToastSuccess, ToastError} from '../common/toast'
import { VillageContext } from "./VillageContext";
import { changePasswordAPI, getMembersAPI, getUserByIdAPI, getUsersAPI, loginUserAPI, registerUserAPI, updateInfoUserAPI, updateRoleUserAPI } from "../../API/authService";
import { USER_DEFAULT } from "../constants/Constants";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const {children}= props;

    const {setIsLoading} = useContext(VillageContext)

    //user
    const [users, setUsers] = useState([])

    //member
    const [members, setMembers] = useState([])

    const [userCurrent, setUserCurrent] = useState(USER_DEFAULT)

    const [isPopupChangePassword, setIsPopupChangePassword] = useState(false)

    const getUsers = async () => {
        const res = await getUsersAPI()
        setUsers(res.data.data)
    }

    const getMembers = async () => {
        const res = await getMembersAPI()
        setMembers(res.data.data)
    }

    const getUserById = async (id) => {
        const res = await getUserByIdAPI(id)
        setUserCurrent(res.data.data)
    }

    useEffect(() => {
        const getLocalUserId = localStorage.getItem('userIdFair');
        if (getLocalUserId) {
            void getUserById(JSON.parse(getLocalUserId))
        }
    }, []);

    const registerUser = async (user) => {
        setIsLoading(true)
        const res = await registerUserAPI(user)

        if(res?.status === 201) {
            setIsLoading(false)
            ToastSuccess("Tạo tài khoản thành công!")
        } else{
            setIsLoading(false)
            ToastError("Đăng kí thất bại!")
        }
        return res;
    }

    const loginUser = async (user) => {
        setIsLoading(true)
        const res = await loginUserAPI(user)
        if(res?.status === 200) {
            ToastSuccess("Đăng nhập thành công")
            setUserCurrent(res.data.data)
            localStorage.setItem('userIdFair', JSON.stringify(res.data.data.id))
        } else  {
            setIsLoading(false)
            ToastError("Tài khoản hoặc mật khẩu không chính xác!")
        }
        return res
    }

    const updateInfoUser = async (user) => {
        setIsLoading(true);
        const res = await updateInfoUserAPI(user)
        if(res?.status === 200) {
            ToastSuccess("Cập nhật thông tin thành công")
            setUserCurrent(res.data.data)
            setIsLoading(false)
        } else  {
            setIsLoading(false)
            ToastError("Update failed!")
        }
        void getUserById(JSON.parse(localStorage.getItem('userIdFair')))
        return res
    }

    const updateRoleUser = async (user) => {
        setIsLoading(true)
        const res = await updateRoleUserAPI(user)
        if(res?.status === 200) {
            ToastSuccess("Cập nhật role thành công")
            setIsLoading(false)
        } else  {
            setIsLoading(false)
            ToastError("Update failed!")
        }
        void getUsers()
        void getMembers()
        return res
        
    }

    const changePassword = async (password) => {
        setIsLoading(true)
        const res = await changePasswordAPI(password)
        if(res?.status === 200) {
            ToastSuccess("Thay đổi mật khẩu thành công")
            setUserCurrent(res.data.data)
            setTimeout(() => {
                setIsLoading(false)
                setUserCurrent(USER_DEFAULT)
            }, 1000)
        } else  {
            setIsLoading(false)
            ToastError("Change password failed!")
        }
        return res
    }

    useEffect(() => {
        void getUsers()
        void getMembers()
    }, [])

    return (
        <AuthContext.Provider 
            value={{updateRoleUser, registerUser,changePassword, setUserCurrent,  loginUser, users, userCurrent, updateInfoUser, isPopupChangePassword, setIsPopupChangePassword, members}}
        >
           {children}
        </AuthContext.Provider>
    )
}