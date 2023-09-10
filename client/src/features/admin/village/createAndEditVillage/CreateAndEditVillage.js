import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./createAndEditVillage.scss";
import {FaCloudUploadAlt} from "react-icons/fa";
import {AiOutlineDelete} from "react-icons/ai";
import { VillageContext } from '../../../../shared/dataContext/VillageContext';
import { TITLE_VILLAGE_ADMIN, VILLAGE_DEFAULT } from '../../../../shared/constants/Constants';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from '../../../../shared/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function CreateAndEditVillage() {
    const {villages, createVillage, updateVillage} = useContext(VillageContext);

    const navigate = useNavigate()

    //get slug
    const {slug} = useParams()

    //get village current 
    const villageCurrent = villages.find(village => village.slug === slug)

    const [formData, setFormData] = useState( villageCurrent ||  VILLAGE_DEFAULT)

    //prev image 
    const [selectedImages, setSelectedImages] = useState( formData.id ? JSON.parse(formData.image) : [])
    //upload image URL current

    //handle upload img to client
    const handleUploadImg = (e) => {
        const selectedFileArray = Array.from(e.target.files)

        void handleUploadToFirebase(selectedFileArray)

    }

    //handle upload images to firebase
    const handleUploadToFirebase = async (images) => {
       for(let i=0; i< images.length; i++ ){
        const imageRef = ref(storage, `/villages/${images[i].name}`)

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

    //get value history
    const handleReactQuill = (value) => {
        setFormData({...formData, history: value})
    }

    //handle add/edit village
    const handleAllVillage = () => {
        if(formData.id) {
            void updateVillage({...formData, image: JSON.stringify(selectedImages) })
        } else {
            void createVillage({...formData, image: JSON.stringify(selectedImages) })
            navigate("/admin/village")
        }
    } 


  return (
    <div className='createAndEditVillage'>
        <div className='createAndEditVillage_title'>
            <h2>{slug ? TITLE_VILLAGE_ADMIN.EDIT_VILLAGE : TITLE_VILLAGE_ADMIN.CREARTE_VILLAGE}</h2>
            <section onClick={handleAllVillage}><FaCloudUploadAlt /></section>
        </div>

        <div className='createAndEditVillage_content'> 

            <div  className='createAndEditVillage_content-input padding_right-input'>
                <p>Name</p>
                <input 
                    type="text" 
                    placeholder='Nhập tên làng'
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div className='createAndEditVillage_content-input'>
                <p>Slug</p>
                <input 
                    type="text" 
                    placeholder='Nhập đường dẫn' 
                    value={formData.slug}
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                />
            </div>

            <div className='createAndEditVillage_content-input  padding_right-input'>
                <p>Address</p>
                <input 
                    type="text" 
                    placeholder='Nhập địa chỉ làng' 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                />
            </div>
            
            <div className='createAndEditVillage_content-input'>
                <p>Geocode</p>
                <input 
                    type="text" 
                    placeholder='Nhập tọa độ địa lí' 
                    value={formData.geocode}
                    onChange={e => setFormData({...formData, geocode: e.target.value})}
                />
            </div>
            
            <div className='createAndEditVillage_content-history'>
                <p>History</p>
                <ReactQuill
                    className='createAndEditVillage_content-history-quill'
                    theme='snow'
                    value={formData.history}
                    onChange={handleReactQuill}
                />
            </div>

            <div className='createAndEditVillage_content-image'>
                <p>Image</p>
                <div className='createAndEditVillage_content-image-upload'>
                    <section>
                        <input 
                            type="file" 
                            multiple 
                            onChange={handleUploadImg}
                            accept='image/png, image/jpeg, image/webp'
                        />
                        <p>Upload {selectedImages.length} image</p>
                    </section>
                    <div className='createAndEditVillage_content-image-upload-wrapper'>  
                    {   selectedImages && selectedImages.map((img, index) => (
                            <div>
                                <img key={index} src={img} alt='img' />
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
