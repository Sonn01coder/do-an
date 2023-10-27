import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import {FaCloudUploadAlt} from "react-icons/fa";
import {AiOutlineDelete} from "react-icons/ai";
import { VillageContext } from '../../../../shared/dataContext/VillageContext';
import { POI_DEFAULT, POS_DEFAULT, TITLE_ADMIN, VILLAGE_DEFAULT } from '../../../../shared/constants/Constants';
import {AiFillCaretDown} from "react-icons/ai"
import { storage } from '../../../../shared/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { POIContext } from '../../../../shared/dataContext/PointOfInterestContext';
import { AuthContext } from '../../../../shared/dataContext/AuthContext';

export default function CreateAndEditPOI() {

    const {userCurrent} = useContext(AuthContext)
    const {villages} = useContext(VillageContext);
    const {poi, createPoi, updatePoi } = useContext(POIContext);

    //check admin village
    const isAdminVillage = userCurrent?.role?.includes(process.env.REACT_APP_VILLAGE_USER)

    const villageId = Number(userCurrent?.role?.match(/\d+/)[0])

    const villageCurrentAdmin  = villages.find(village => village.id === villageId)

//handle logic crate and edit
 
    //get slug
    const {slug} = useParams()

    //show popup village
    const [popupVillages, setPopupVillages] = useState(false)

    //get village current 
    const poiCurrent = poi.find(product => product.slug === slug)

    const [formData, setFormData] = useState(poiCurrent || POI_DEFAULT)

    //village current 
    const [villageCurrent, setVillageCurrent] = useState(villages.find(village => village.id === formData.villageId) || VILLAGE_DEFAULT)

    //prev image 
    const [selectedImages, setSelectedImages] = useState( formData.id ? JSON.parse(formData.image) : [])


    //handle upload img to client
    const handleUploadImg = (e) => {
        const selectedFileArray = Array.from(e.target.files)

        void handleUploadToFirebase(selectedFileArray)
    }

    //get value description
    const handleReactQuill = (value) => {
        setFormData({...formData, description: value})
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

    //handle remove images 
    const handleRemoveImages = (img) => {
        setSelectedImages(selectedImages.filter(item => item !== img))
    }

    //handle add/edit village
    const handleAllProduct = () => {
        if(formData.id) {
            void updatePoi({...formData, image: JSON.stringify(selectedImages) , villageId: villageCurrent.id || villageCurrentAdmin?.id, id: formData.id})
        } else {
            void createPoi({...formData, image: JSON.stringify(selectedImages), villageId: villageCurrent.id || villageCurrentAdmin?.id })
            setFormData(POS_DEFAULT)
            setVillageCurrent(VILLAGE_DEFAULT)
            setSelectedImages([])
        }
    } 

  return (
    <div className='createAndEditPOS'>
        <div className='createAndEditPOS_title'>
            <h2>{slug ? TITLE_ADMIN.POINT_OF_SERVICE.EDIT : TITLE_ADMIN.POINT_OF_SERVICE.CREATE}</h2>
            <section onClick={handleAllProduct}><FaCloudUploadAlt /></section>
        </div>

        <div className='createAndEditPOS_content'> 

            <div  className='createAndEditPOS_content-input padding_right-input'>
                <p>Name</p>
                <input 
                    type="text" 
                    placeholder='Nhập tên địa điểm dịch vụ'
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div className='createAndEditPOS_content-input'>
                <p className='font-left'>Slug</p>
                <input 
                    type="text" 
                    placeholder='Nhập đường dẫn' 
                    value={formData.slug}
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                />
            </div>

            <div className='createAndEditPOS_content-input'>
                <p>Address</p>
                <input 
                    type="text" 
                    placeholder='Nhập địa chỉ dịch vụ' 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                />
            </div>
            
            <div className='createAndEditPOS_content-input'>
                <p className='font-left'>Geocode</p>
                <input 
                    type="text" 
                    placeholder='Nhập tọa độ địa lí' 
                    value={formData.geocode}
                    onChange={e => setFormData({...formData, geocode: e.target.value})}
                />
            </div>

            <div className='createAndEditPOS_content-input  full-width'>
                <p>Village</p>
                {
                    isAdminVillage ? 
                    (
                        <input 
                            type="text" 
                            placeholder='Địa điểm dịch lịch' 
                            value={villageCurrentAdmin?.name}
                        />
                    ) : (
                        <input 
                            type="text" 
                            placeholder='Địa điểm dịch lịch gần làng' 
                            value={villageCurrent.name}
                            onClick={() => setPopupVillages(true)}
                        />
                    )
                }
                {
                    popupVillages && (
                        <div ref={popupRef} className='createAndEditPOS_content-input-popup'>
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
            
            <div className='createAndEditPOS_content-image'>
                <p>Image</p>
                <div className='createAndEditPOS_content-image-upload'>
                    <section>
                        <input 
                            type="file" 
                            multiple 
                            onChange={handleUploadImg}
                            accept='image/png, image/jpeg, image/webp'
                        />
                        <p>Upload {selectedImages.length} image</p>
                    </section>
                    <div className='createAndEditPOS_content-image-upload-wrapper'>  
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
