import { createContext, useEffect, useState } from "react";
import { createVillageAPI, getALlVillageAPI, updateVillageAPI, deleteVillageAPI } from "../../API/villageService";
import {ToastSuccess, ToastError} from '../common/toast'

export const VillageContext = createContext();

export const VillageProvider = (props) => {
    const {children}= props;
    const [villages, setVillages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [popupAdmin, setPopupAdmin] = useState({isPopup: false, content: "", id: 0, category: ""})

    const getAllVillages = async () => {
        const res = await getALlVillageAPI()
        setVillages(res.data.data)
    }

    const createVillage = async (village) => {
        setIsLoading(true)
        const res = await createVillageAPI(village)
        if(res.status === 201) {
            setIsLoading(false)
            ToastSuccess("Thêm làng thành công")
        } else  {
            setIsLoading(false)
            ToastError("Thêm thất bại")
        }

        void getAllVillages()
    }

    const updateVillage = async (village) => {
        setIsLoading(true)
        const res = await updateVillageAPI(village)
        if(res.status === 200) {
            setIsLoading(false)
            ToastSuccess("Sửa làng thành công")
        } else  {
            setIsLoading(false)
            ToastError("Lưu thất bại")
        }

        void getAllVillages()
    }

    const deleteVillage = async (id) => {
        const res = await deleteVillageAPI(id)
        if(res.status === 204) {
            setIsLoading(false)
            ToastSuccess("Xóa thành công")
        } else  {
            setIsLoading(false)
            ToastError("Xóa thất bại")
        }

        void getAllVillages()
    }
 
    useEffect(() => {
        void getAllVillages()
    }, [])

    return (
        <VillageContext.Provider 
            value={{villages, createVillage, updateVillage, deleteVillage, popupAdmin, setPopupAdmin, isLoading, setIsLoading}}
        >
           {children}
        </VillageContext.Provider>
    )
}