import { createAxiosInstance } from "./axois"
import { AUTH_URL } from "../shared/constants/Constants"

const userAxios = createAxiosInstance(AUTH_URL)

export const getUsersAPI = async () => {
    return userAxios.get("getUsers")
}

export const getMembersAPI = async () => {
    return userAxios.get("getMember")
}

export const loginUserAPI = async (user) => {
    return userAxios.post("/login", user)
}

export const registerUserAPI = async (user) => {
    return await userAxios.post("/register", user)
    
}   

export const updateInfoUserAPI = async (user) => {
    return  await userAxios.put("/updateInfoUser", user)
}

export const changePasswordAPI = async (password) =>  {
    return await userAxios.put("/changepassword", password)
}

export const deleteUserAPI = async (id) => {
    return await userAxios.delete(`/delete/${id}`)
}

export const getUserByIdAPI = async (id) => {
    return await userAxios.get(`/getUser/${id}`)
}

export const updateRoleUserAPI = async (user) => {
    return await userAxios.put("/updateRole", user)
} 


