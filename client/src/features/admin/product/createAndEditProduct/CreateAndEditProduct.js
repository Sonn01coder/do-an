import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import "./createAndEditProduct.scss";
import {FaCloudUploadAlt} from "react-icons/fa";
import {AiOutlineDelete} from "react-icons/ai";
import { VillageContext } from '../../../../shared/dataContext/VillageContext';
import { PRODUCT_DEFAULT, TITLE_ADMIN, VILLAGE_DEFAULT } from '../../../../shared/constants/Constants';
import ReactQuill from 'react-quill';
import {AiFillCaretDown} from "react-icons/ai"
import 'react-quill/dist/quill.snow.css';
import { storage } from '../../../../shared/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ProductContext } from '../../../../shared/dataContext/ProductContetx';

export default function CreateAndEditProduct() {
    const {villages} = useContext(VillageContext);
    const {products, createProduct, updateProduct} = useContext(ProductContext);

    //get slug
    const {slug} = useParams()

    //show popup village
    const [popupVillages, setPopupVillages] = useState(false)

    //get village current 
    const productCurrent = products.find(product => product.slug === slug)

    const [formData, setFormData] = useState(productCurrent || PRODUCT_DEFAULT)

    //village current 
    const [villageCurrent, setVillageCurrent] = useState(villages.find(village => village.id === formData.villageId) || VILLAGE_DEFAULT)

    //prev image 
    const [selectedImages, setSelectedImages] = useState( formData.id ? JSON.parse(formData.image) : [])


    //handle upload img to client
    const handleUploadImg = (e) => {
        const selectedFileArray = Array.from(e.target.files)

        void handleUploadToFirebase(selectedFileArray)

    }

    //ref popup
    const popupRef = useRef()
    
    //click outside => close popup
    useEffect(() => {
        const handler = (e) => {
        if (popupRef?.current?.contains(e.target) === false) {
            setPopupVillages(false);
        }
        };
        document.addEventListener('mousedown', handler);

        return () => {
        document.removeEventListener('mousedown', handler);
        };
    }, []);

    //handle pick village
    const handlePickVillage = (village) => {
        setVillageCurrent(village)
        setPopupVillages(false)
    }

    //handle upload images to firebase
    const handleUploadToFirebase = async (images) => {
       for(let i=0; i< images.length; i++ ){
        const imageRef = ref(storage, `/products/${images[i].name}`)

        try {
            const uploadTask = await uploadBytes(imageRef, images[i]);

            const downloadURL = await getDownloadURL(uploadTask.ref);

            if(!selectedImages.includes(downloadURL)) {
                setSelectedImages(prev => [...prev, downloadURL])
            }

        } catch (error) {
            console.error(error);
        }
       }
    } 
    console.log(formData);

    //handle remove images 
    const handleRemoveImages = (img) => {
        setSelectedImages(selectedImages.filter(item => item !== img))
    }

    //get value description
    const handleReactQuill = (value) => {
        setFormData({...formData, description: value})
    }

    //handle add/edit village
    const handleAllProduct = () => {
        if(formData.id) {
            void updateProduct({...formData, image: JSON.stringify(selectedImages) , villageId: villageCurrent.id, id: formData.id})
        } else {
            void createProduct({...formData, image: JSON.stringify(selectedImages), villageId: villageCurrent.id })
            setFormData(PRODUCT_DEFAULT)
            setVillageCurrent(VILLAGE_DEFAULT)
        }
    } 

  return (
    <div className='createAndEditProduct'>
        <div className='createAndEditProduct_title'>
            <h2>{slug ? TITLE_ADMIN.PRODUCT.EDIT : TITLE_ADMIN.PRODUCT.CREATE}</h2>
            <section onClick={handleAllProduct}><FaCloudUploadAlt /></section>
        </div>

        <div className='createAndEditProduct_content'> 

            <div  className='createAndEditProduct_content-input padding_right-input'>
                <p>Name</p>
                <input 
                    type="text" 
                    placeholder='Nhập tên sản phẩm'
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div className='createAndEditProduct_content-input'>
                <p className='font-left'>Slug</p>
                <input 
                    type="text" 
                    placeholder='Nhập đường dẫn' 
                    value={formData.slug}
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                />
            </div>

            <div className='createAndEditProduct_content-input  full-width'>
                <p>Village</p>
                <input 
                    type="text" 
                    placeholder='Sản phẩm thuộc làng' 
                    value={villageCurrent.name}
                    onClick={() => setPopupVillages(true)}
                />
                {
                    popupVillages && (
                        <div ref={popupRef} className='createAndEditProduct_content-input-popup'>
                            <div>
                                {
                                    villages.map(village => (
                                        <p key={village.id} onClick={() => handlePickVillage(village)}>{village.name}</p>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                <section><AiFillCaretDown /></section>

            </div>
            
            <div className='createAndEditProduct_content-history'>
                <p>Description</p>
                <ReactQuill
                    className='createAndEditProduct_content-history-quill'
                    theme='snow'
                    value={formData.description}
                    onChange={handleReactQuill}
                />
            </div>

            <div className='createAndEditProduct_content-image'>
                <p>Image</p>
                <div className='createAndEditProduct_content-image-upload'>
                    <section>
                        <input 
                            type="file" 
                            multiple 
                            onChange={handleUploadImg}
                            accept='image/png, image/jpeg, image/webp'
                        />
                        <p>Upload {selectedImages.length} image</p>
                    </section>
                    <div className='createAndEditProduct_content-image-upload-wrapper'>  
                    {   selectedImages && selectedImages.map((img, index) => (
                            <div  key={index}> 
                                <img src={img} alt='img' />
                                <span onClick={() => handleRemoveImages(img)}><AiOutlineDelete /></span>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
