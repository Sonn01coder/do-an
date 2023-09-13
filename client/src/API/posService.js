import { POS_URL } from "../shared/constants/Constants"
import { createAxiosInstance } from "./axois"

const posAxios = createAxiosInstance(POS_URL)


export const getALlPosAPI = async () => {
    return posAxios.get("/getAll")
    
}

export const createPosAPI = async (pos) => {
    return await posAxios.post("/create", pos)
    
}   

export const updatePosAPI = async (pos) => {
    return  await posAxios.put("/update", pos)
}

export const deletePosAPI = async (id) => {
    return await posAxios.delete(`/delete/${id}`)
}
