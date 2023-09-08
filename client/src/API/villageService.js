import axios from "axios"
import { VILLAGE_BASE } from "../shared/constants/Constants"

export const getALlVillageAPI = async () => {
    return axios.get( VILLAGE_BASE + "/getAll")
}
