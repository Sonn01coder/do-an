import { NEI_URL } from "../shared/constants/Constants"
import { createAxiosInstance } from "./axois"

const neiAxios = createAxiosInstance(NEI_URL)


export const getAllNeiAPI = async () => {
    return neiAxios.get("/getAll")
    
}

export const createNeiAPI = async (nei) => {
    return await neiAxios.post("/create", nei)
    
}   

export const updateNeiAPI = async (nei) => {
    return  await neiAxios.put("/update", nei)
}

export const deleteNeiAPI = async (id) => {
    return await neiAxios.delete(`/delete/${id}`)
}
