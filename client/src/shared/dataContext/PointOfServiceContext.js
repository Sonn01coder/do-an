import { createContext, useContext, useEffect, useState } from "react";
import {ToastSuccess, ToastError} from '../common/toast'
import { VillageContext } from "./VillageContext";
import { createPosAPI, deletePosAPI, getALlPosAPI, updatePosAPI } from "../../API/posService";

export const POSContext = createContext();

export const POSProvider = (props) => {
    const {setIsLoading} = useContext(VillageContext)

    const {children}= props;
    const [pos, setPos] = useState([])

    const getAllPos = async () => {
        const res = await getALlPosAPI()
        setPos(res.data.data)
    }

    const createPos = async (pos) => {
        setIsLoading(true)
        const res = await createPosAPI(pos)
        if(res.status === 201) {
            setIsLoading(false)
            ToastSuccess("Thêm địa điểm dịch vụ thành công")
        } else  {
            setIsLoading(false)
            ToastError("Thêm thất bại")
        }

        void getAllPos()
    }

    const updatePos = async (pos) => {
        setIsLoading(true)
        const res = await updatePosAPI(pos)
        if(res.status === 200) {
            setIsLoading(false)
            ToastSuccess("Sửa địa điểm dịch vụ thành công")
        } else  {
            setIsLoading(false)
            ToastError("Lưu thất bại")
        }

        void getAllPos()
    }

    const deletePos = async (id) => {
        const res = await deletePosAPI(id)
        if(res.status === 204) {
            setIsLoading(false)
            ToastSuccess("Xóa thành công")
        } else  {
            setIsLoading(false)
            ToastError("Xóa thất bại")
        }

        void getAllPos()
    }
 
    useEffect(() => {
        void getAllPos()
    }, [])

    return (
        <POSContext.Provider 
            value={{deletePos, createPos, updatePos, pos}}
        >
           {children}
        </POSContext.Provider>
    )
}