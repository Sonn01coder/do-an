import {VILLAGE_URL } from "../shared/constants/Constants"
import { createAxiosInstance } from "./axois"
import { ToastError, ToastSuccess } from "../shared/common/toast"

const villageAxios = createAxiosInstance(VILLAGE_URL)


export const getALlVillageAPI = async () => {
    return villageAxios.get("/getAll")
}

export const createVillageAPI = async (village) => {
    const res = await villageAxios.post("/create", village)
    if(res !== undefined) {
        ToastSuccess("Thêm làng thành công")
    } else  {
        ToastError("Thêm thất bại")
    }
}   

export const updateVillageAPI = async (village) => {
    const res = await villageAxios.put("/update", village)
    if(res !== undefined) {
        ToastSuccess("Sửa làng thành công")
    }  else {
        ToastError("Sửa thất bại")
    }

}

export const deleteVillageAPI = async (id) => {
    const res  = await villageAxios.delete(`/delete/${id}`)
    if(res !== undefined) {
        ToastSuccess("Xóa làng thành công")
    } else {
        ToastError("Xóa thất bại")
    }
}
