import { HISTORY_TOUR_URL } from "../shared/constants/Constants"
import { createAxiosInstance } from "./axois"

const historytourAxios = createAxiosInstance(HISTORY_TOUR_URL)


export const getAllHistoryTourAPI = async () => {
    return historytourAxios.get("/getAll")
    
}

export const createHistoryTourAPI = async (tour) => {
    return await historytourAxios.post("/create", tour)
    
}   

export const updateHisotryTourAPI = async (tour) => {
    return  await historytourAxios.put("/update", tour)
}

export const deleteHistoryTourAPI = async (id) => {
    return await historytourAxios.delete(`/delete/${id}`)
}
