import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { storage } from '../../../../shared/firebase'
import { TITLE_ADMIN } from '../../../../shared/constants/Constants'
import {FaCloudUploadAlt} from "react-icons/fa"
import {AiOutlineDelete} from "react-icons/ai"
import { TourContext } from '../../../../shared/dataContext/TourContext'

export default function CreateAndEditPlaceTour() {
    const {createPlaceOfTour} = useContext(TourContext)
    //get slug
    const {slug} = useParams()

    const [formData, setFormData] = useState({name: '', geocode: '', link: ''})

    //prev image 
    const [selectedImages, setSelectedImages] = useState( [])
    // const [selectedImages, setSelectedImages] = useState( formData.id ? JSON.parse(formData.image) : [])


    //handle upload img to client
    const handleUploadImg = (e) => {
        const selectedFileArray = Array.from(e.target.files)

        void handleUploadToFirebase(selectedFileArray)
    }

    const handleCreateOrEdit = () => {
        void createPlaceOfTour({name: formData.name, image: JSON.stringify(selectedImages), link :formData.link, geocode: formData.geocode})
        setFormData({name: '', geocode: '', link: ''})
        setSelectedImages([])
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

  return (
    <div className='createAndEditPOS'>
        <div className='createAndEditPOS_title'>
            <h2>{slug ? TITLE_ADMIN.PLACE_OF_TOUR.EDIT : TITLE_ADMIN.PLACE_OF_TOUR.CREATE}</h2>
            <section onClick={handleCreateOrEdit}><FaCloudUploadAlt /></section>
        </div>

        <div className='createAndEditPOS_content'> 

            <div  className='createAndEditPOS_content-input padding_right-input'>
                <p>Name</p>
                <input 
                    type="text" 
                    placeholder='Nhập tên địa điểm'
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
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

            <div className='createAndEditPOS_content-input full-width'>
                <p>Link</p>
                <input 
                    type="text" 
                    placeholder='Link' 
                    value={formData.link}
                    onChange={e => setFormData({...formData, link: e.target.value})}
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
