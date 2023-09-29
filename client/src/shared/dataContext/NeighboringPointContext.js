import { createContext, useContext, useEffect, useState } from "react";
import {ToastSuccess, ToastError} from '../common/toast'
import { VillageContext } from "./VillageContext";
import { createNeiAPI, deleteNeiAPI, getAllNeiAPI, updateNeiAPI } from "../../API/neiService";
import axios from "axios";

export const NeiContext = createContext();

export const NeiProvider = (props) => {
    const {setIsLoading} = useContext(VillageContext)

    const {children}= props;
    const [nei, setNei] = useState([])

  const [neiVillage, setNeiVillage] = useState([])


    const getAllNei = async () => {
        const res = await getAllNeiAPI()
        setNei(res.data.data)
    }

    const query = `
    [out:json];
(
  node["amenity"="restaurant"](around:3500, 20.926894646070185, 105.88666666185598); 
  node["amenity"="cafe"](around:3500, 20.926894646070185, 105.88666666185598);
);
out;

`;

    const getNeiVillage = async () => {
        axios.get('https://overpass-api.de/api/interpreter', {
        params: {
            data: query,
        },
    })
    .then(response => {
        const restaurants = response.data.elements;
        setNeiVillage([...restaurants])
    })
    .catch(error => {
        console.error(error);
    });
    } 

    const createNei = async (nei) => {
        setIsLoading(true)
        const res = await createNeiAPI(nei)
        if(res.status === 201) {
            setIsLoading(false)
            ToastSuccess("Thêm địa điểm dịch vụ thành công")
        } else  {
            setIsLoading(false)
            ToastError("Thêm thất bại")
        }

        void getAllNei()
    }

    const updateNei = async (nei) => {
        setIsLoading(true)
        const res = await updateNeiAPI(nei)
        if(res.status === 200) {
            setIsLoading(false)
            ToastSuccess("Sửa địa điểm dịch vụ thành công")
        } else  {
            setIsLoading(false)
            ToastError("Lưu thất bại")
        }

        void getAllNei()
    }

    const deleteNei = async (id) => {
        const res = await deleteNeiAPI(id)
        if(res.status === 204) {
            setIsLoading(false)
            ToastSuccess("Xóa thành công")
        } else  {
            setIsLoading(false)
            ToastError("Xóa thất bại")
        }

        void getAllNei()
    }
 
    useEffect(() => {
        // void getAllNei()
        void getNeiVillage()
    }, [])

    return (
        <NeiContext.Provider 
            value={{deleteNei, createNei, updateNei, nei, neiVillage}}
        >
           {children}
        </NeiContext.Provider>
    )
}