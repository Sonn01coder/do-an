import { createContext, useContext, useEffect, useState } from "react";
import {ToastSuccess, ToastError} from '../common/toast'
import { VillageContext } from "./VillageContext";
import { createPoiAPI, deletePoiAPI, getAllPoiAPI, updatePoiAPI } from "../../API/poiService";

export const POIContext = createContext();

export const POIProvider = (props) => {
    const {setIsLoading} = useContext(VillageContext)

    const {children}= props;
    const [poi, setPoi] = useState([])

    const getAllPoi = async () => {
        const res = await getAllPoiAPI()
        setPoi(res.data.data)
    }

    const createPoi = async (poi) => {
        setIsLoading(true)
        const res = await createPoiAPI(poi)
        if(res.status === 201) {
            setIsLoading(false)
            ToastSuccess("Thêm địa điểm dịch vụ thành công")
        } else  {
            setIsLoading(false)
            ToastError("Thêm thất bại")
        }

        void getAllPoi()
    }

    const updatePoi = async (poi) => {
        setIsLoading(true)
        const res = await updatePoiAPI(poi)
        if(res.status === 200) {
            setIsLoading(false)
            ToastSuccess("Sửa địa điểm dịch vụ thành công")
        } else  {
            setIsLoading(false)
            ToastError("Lưu thất bại")
        }

        void getAllPoi()
    }

    const deletePoi = async (id) => {
        const res = await deletePoiAPI(id)
        if(res.status === 204) {
            setIsLoading(false)
            ToastSuccess("Xóa thành công")
        } else  {
            setIsLoading(false)
            ToastError("Xóa thất bại")
        }

        void getAllPoi()
    }
 
    useEffect(() => {
        void getAllPoi()
    }, [])

    return (
        <POIContext.Provider 
            value={{deletePoi, createPoi, updatePoi, poi}}
        >
           {children}
        </POIContext.Provider>
    )
}