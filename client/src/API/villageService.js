import {VILLAGE_URL } from "../shared/constants/Constants"
import { createAxiosInstance } from "./axois"

const villageAxios = createAxiosInstance(VILLAGE_URL)


export const getALlVillageAPI = async () => {
    return villageAxios.get("/getAll")
}

export const createVillageAPI = async (village) => {
    return await villageAxios.post("/create", village)
    
}   

export const updateVillageAPI = async (village) => {
    return  await villageAxios.put("/update", village)
}

export const deleteVillageAPI = async (id) => {
    return await villageAxios.delete(`/delete/${id}`)
}
