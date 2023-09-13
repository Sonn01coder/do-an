import { POI_URL } from "../shared/constants/Constants"
import { createAxiosInstance } from "./axois"

const poiAxios = createAxiosInstance(POI_URL)


export const getAllPoiAPI = async () => {
    return poiAxios.get("/getAll")
    
}

export const createPoiAPI = async (poi) => {
    return await poiAxios.post("/create", poi)
    
}   

export const updatePoiAPI = async (poi) => {
    return  await poiAxios.put("/update", poi)
}

export const deletePoiAPI = async (id) => {
    return await poiAxios.delete(`/delete/${id}`)
}
