import { PRODUCT_URL } from "../shared/constants/Constants"
import { createAxiosInstance } from "./axois"

const productAxios = createAxiosInstance(PRODUCT_URL)


export const getALlProductAPI = async () => {
    return productAxios.get("/getAll")
    
}

export const createProductAPI = async (product) => {
    return await productAxios.post("/create", product)
    
}   

export const updateProductAPI = async (product) => {
    return  await productAxios.put("/update", product)
}

export const deleteProductAPI = async (id) => {
    return await productAxios.delete(`/delete/${id}`)
}
