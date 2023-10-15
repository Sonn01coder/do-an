import { PLACE_OF_TOUR_URL } from "../shared/constants/Constants"
import { createAxiosInstance } from "./axois"

const poiAxios = createAxiosInstance(PLACE_OF_TOUR_URL)


export const getAllPlaceOfTourAPI = async () => {
    return poiAxios.get("/getAll")
}

export const createPlaceOfTourAPI = async (poi) => {
    return await poiAxios.post("/create", poi)
}   

export const updatePlaceOfTourAPI = async (poi) => {
    return  await poiAxios.put("/update", poi)
}

export const deletePlaceOfTourAPI = async (id) => {
    return await poiAxios.delete(`/delete/${id}`)
}
