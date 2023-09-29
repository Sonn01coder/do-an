import { createContext, useContext, useEffect, useState } from "react";
import {ToastSuccess, ToastError} from '../common/toast'
import { createProductAPI, deleteProductAPI, getALlProductAPI, updateProductAPI } from "../../API/productService";
import { VillageContext } from "./VillageContext";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
    const {setIsLoading} = useContext(VillageContext)

    const {children}= props;
    const [products, setProducts] = useState([])

    const [popupProduct, setPopupProduct] = useState({isPopup: false, product: {}})

    const getAllProducts = async () => {
        const res = await getALlProductAPI()
        setProducts(res.data.data)
    }

    const createProduct = async (product) => {
        setIsLoading(true)
        const res = await createProductAPI(product)
        if(res.status === 201) {
            setIsLoading(false)
            ToastSuccess("Thêm sản phẩm thành công")
        } else  {
            setIsLoading(false)
            ToastError("Thêm thất bại")
        }

        void getAllProducts()
    }

    const updateProduct = async (product) => {
        setIsLoading(true)
        const res = await updateProductAPI(product)
        if(res.status === 200) {
            setIsLoading(false)
            ToastSuccess("Sửa sản phẩm thành công")
        } else  {
            setIsLoading(false)
            ToastError("Lưu thất bại")
        }

        void getAllProducts()
    }

    const deleteProduct = async (id) => {
        const res = await deleteProductAPI(id)
        if(res.status === 204) {
            setIsLoading(false)
            ToastSuccess("Xóa thành công")
        } else  {
            setIsLoading(false)
            ToastError("Xóa thất bại")
        }

        void getAllProducts()
    }
 
    useEffect(() => {
        void getAllProducts()
    }, [])

    return (
        <ProductContext.Provider 
            value={{products, createProduct, updateProduct, deleteProduct, popupProduct, setPopupProduct}}
        >
           {children}
        </ProductContext.Provider>
    )
}