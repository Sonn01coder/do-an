import { TOUR_URL } from "../shared/constants/Constants"
import { createAxiosInstance } from "./axois"

const tourAxios = createAxiosInstance(TOUR_URL)


export const getAllTourAPI = async () => {
    return tourAxios.get("/getAll")
}

export const createTourAPI = async (tour) => {
    return await tourAxios.post("/create", tour)
}   

export const updateTourAPI = async (tour) => {
    return  await tourAxios.put("/update", tour)
}

export const deleteTourAPI = async (id) => {
    return await tourAxios.delete(`/delete/${id}`)
}
