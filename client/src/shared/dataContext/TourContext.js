import { createContext, useContext, useEffect, useState } from "react";
import { VillageContext } from "./VillageContext";
import { createPlaceOfTourAPI, deletePlaceOfTourAPI, getAllPlaceOfTourAPI, updatePlaceOfTourAPI } from "../../API/placeTourService";
import { ToastError, ToastSuccess } from "../common/toast";
import { createTourAPI, deleteTourAPI, getAllTourAPI, updateTourAPI } from "../../API/tourService";

export const TourContext = createContext();

export const TourProvider = (props) => {
    const {setIsLoading} = useContext(VillageContext)

    const {children}= props;
    const [placeTour, setPlaceTour] = useState([])

    const [tours, setTours] = useState([])

    //place of tour
    const getAllPlaceOfTour = async () => {
        const res = await getAllPlaceOfTourAPI()
        setPlaceTour(res.data.data)
    }

    const createPlaceOfTour = async (place) => {
        setIsLoading(true)
        const res = await createPlaceOfTourAPI(place)
        if(res.status === 201) {
            setIsLoading(false)
            ToastSuccess("Thêm sản phẩm thành công")
        } else  {
            setIsLoading(false)
            ToastError("Thêm thất bại")
        }

        void getAllPlaceOfTour()
    }

    const updatePlaceTour = async (place) => {
        setIsLoading(true)
        const res = await updatePlaceOfTourAPI(place)
        if(res.status === 200) {
            setIsLoading(false)
            ToastSuccess("Sửa sản phẩm thành công")
        } else  {
            setIsLoading(false)
            ToastError("Lưu thất bại")
        }
        void getAllPlaceOfTour()
    }

    const deletePlaceTour = async (id) => {
        const res = await deletePlaceOfTourAPI(id)
        if(res.status === 204) {
            setIsLoading(false)
            ToastSuccess("Xóa thành công")
        } else  {
            setIsLoading(false)
            ToastError("Xóa thất bại")
        }
        void getAllPlaceOfTour()
    }


    //tour
    const getAllTour = async () => {
        const res = await getAllTourAPI()
        setTours(res.data.data)
    }

    const createTour = async (place) => {
        setIsLoading(true)
        const res = await createTourAPI(place)
        if(res.status === 201) {
            setIsLoading(false)
            ToastSuccess("Thêm sản phẩm thành công")
        } else  {
            setIsLoading(false)
            ToastError("Thêm thất bại")
        }
        void getAllTour()
    }

    const updateTour = async (place) => {
        setIsLoading(true)
        const res = await updateTourAPI(place)
        if(res.status === 200) {
            setIsLoading(false)
            ToastSuccess("Sửa sản phẩm thành công")
        } else  {
            setIsLoading(false)
            ToastError("Lưu thất bại")
        }

        void getAllTour()
    }

    const deleteTour = async (id) => {
        const res = await deleteTourAPI(id)
        if(res.status === 204) {
            setIsLoading(false)
            ToastSuccess("Xóa thành công")
        } else  {
            setIsLoading(false)
            ToastError("Xóa thất bại")
        }

        void getAllTour()
    }
 
    useEffect(() => {
        void getAllPlaceOfTour()
        void getAllTour()
    }, [])

    return (
        <TourContext.Provider 
            value={{placeTour, createPlaceOfTour, updatePlaceTour, deletePlaceTour, tours, createTour, updateTour, deleteTour}}
        >
           {children}
        </TourContext.Provider>
    )
}