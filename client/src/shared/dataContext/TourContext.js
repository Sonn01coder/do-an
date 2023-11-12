import { createContext, useContext, useEffect, useState } from "react";
import { VillageContext } from "./VillageContext";
import { createPlaceOfTourAPI, deletePlaceOfTourAPI, getAllPlaceOfTourAPI, updatePlaceOfTourAPI } from "../../API/placeTourService";
import { ToastError, ToastSuccess } from "../common/toast";
import { createTourAPI, deleteTourAPI, getAllTourAPI, updateTourAPI } from "../../API/tourService";
import { createHistoryTourAPI, getAllHistoryTourAPI } from "../../API/historytourService";
import { HISTORY_TOUR_DEFAULT } from "../constants/Constants";

export const TourContext = createContext();

export const TourProvider = (props) => {
    const {setIsLoading} = useContext(VillageContext)

    const {children}= props;

    //list place of tour
    const [placeTour, setPlaceTour] = useState([])

    //list tour
    const [tours, setTours] = useState([])

    //list history tour
    const [historyTour, setHistoryTour] = useState([])

    //when click book tour
    const [nameTour, setNameTour] = useState("Tour 1")

    //book tour
    const [bookTour, setBookTour] = useState(HISTORY_TOUR_DEFAULT)

    //user tour
    const [waypoints, setWaypoints] = useState([])

//PLACE OF TOUR
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

//TOUR
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

//HISTORY TOUR
    const getAllHistoryTour = async () => {
        const res = await getAllHistoryTourAPI()
        setHistoryTour(res.data.data)
    }

    const createHistoryTour = async (tour) => {
        setIsLoading(true)
        const res = await createHistoryTourAPI(tour)
        if(res.status === 201) {
            setIsLoading(false)
            ToastSuccess("Thêm sản phẩm thành công")
        } else  {
            setIsLoading(false)
            ToastError("Thêm thất bại")
        }
        void getAllHistoryTour()
    }

    const updateHistoryTour = async (tour) => {
        setIsLoading(true)
        const res = await updateTourAPI(tour)
        if(res.status === 200) {
            setIsLoading(false)
            ToastSuccess("Sửa sản phẩm thành công")
        } else  {
            setIsLoading(false)
            ToastError("Lưu thất bại")
        }

        void getAllHistoryTourAPI()
    }

    const deleteHistoryTour = async (id) => {
        const res = await deleteTourAPI(id)
        if(res.status === 204) {
            setIsLoading(false)
            ToastSuccess("Xóa thành công")
        } else  {
            setIsLoading(false)
            ToastError("Xóa thất bại")
        }

        void getAllHistoryTour()
    }
 
    useEffect(() => {
        void getAllPlaceOfTour()
        void getAllTour()
        void getAllHistoryTour()
    }, [])

    return (
        <TourContext.Provider 
            value={{placeTour, 
                    createPlaceOfTour, 
                    updatePlaceTour, 
                    deletePlaceTour, 
                    tours, 
                    createTour, 
                    updateTour, 
                    deleteTour, 
                    historyTour, 
                    createHistoryTour,
                    updateHistoryTour,
                    deleteHistoryTour,
                    nameTour, 
                    setNameTour,
                    bookTour,
                    setBookTour,
                    waypoints, 
                    setWaypoints
                }}
        >
           {children}
        </TourContext.Provider>
    )
}