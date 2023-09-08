import { createContext, useEffect, useState } from "react";
import { getALlVillageAPI } from "../../API/villageService";
import axios from "axios";

export const VillageContext = createContext();

export const VillageProvider = (props) => {
    const {children}= props;
    const [villages, setVillages] = useState([])

    

    const getAllVillages = async () => {
        try {
            const res = await getALlVillageAPI()
            setVillages(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        void getAllVillages()
    }, [])

    return (
        <VillageContext.Provider value={{villages}}>
           {children}
        </VillageContext.Provider>
    )
}