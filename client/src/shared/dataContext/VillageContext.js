import { createContext, useEffect, useState } from "react";
import { createVillageAPI, getALlVillageAPI, updateVillageAPI, deleteVillageAPI } from "../../API/villageService";


export const VillageContext = createContext();

export const VillageProvider = (props) => {
    const {children}= props;
    const [villages, setVillages] = useState([])
    const [popupAdmin, setPopupAdmin] = useState({isPopup: false, content: "", id: 0, category: ""})

    const getAllVillages = async () => {
        const res = await getALlVillageAPI()
        setVillages(res.data.data)
    }

    const createVillage = async (village) => {
        await createVillageAPI(village)
        void getAllVillages()
    }

    const updateVillage = async (village) => {
        await updateVillageAPI(village)
        void getAllVillages()
    }

    const deleteVillage = async (id) => {
        await deleteVillageAPI(id)
        void getAllVillages()
    }
 
    useEffect(() => {
        void getAllVillages()
    }, [])

    return (
        <VillageContext.Provider 
            value={{villages, createVillage, updateVillage, deleteVillage, popupAdmin, setPopupAdmin}}
        >
           {children}
        </VillageContext.Provider>
    )
}