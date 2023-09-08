import React, { useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import "./createAndEditVillage.scss";
import {FaCloudUploadAlt} from "react-icons/fa";
import {AiOutlineDelete} from "react-icons/ai";
import { VillageContext } from '../../../shared/dataContext/VillageContext';
import { TITLE_VILLAGE_ADMIN } from '../../../shared/constants/Constants';

export default function CreateAndEditVillage() {
    const {villages} = useContext(VillageContext)

    const {slug} = useParams()

    //get village current 
    const village = villages.find(village => village.slug === slug)

    console.log(village);

    const [selectedImages, setSelectedImages] = useState([])

    //handle up load img
    const handleUploadImg = (e) => {
        const selectedFileArray = Array.from(e.target.files)

        const imagesArray = selectedFileArray.map(file => {
            return URL.createObjectURL(file)
        })
        setSelectedImages(imagesArray)
    }


  return (
    <div className='createAndEditVillage'>
        <div className='createAndEditVillage_title'>
            <h2>{slug ? TITLE_VILLAGE_ADMIN.EDIT_VILLAGE : TITLE_VILLAGE_ADMIN.CREARTE_VILLAGE}</h2>
            <section><FaCloudUploadAlt /></section>
        </div>

        <div className='createAndEditVillage_content'> 

            <div  className='createAndEditVillage_content-input padding_right-input'>
                <p>Name</p>
                <input type="text" placeholder='Nhập tên làng'/>
            </div>

            <div className='createAndEditVillage_content-input'>
                <p>Slug</p>
                <input type="text" placeholder='Nhập đường dẫn' />
            </div>

            <div className='createAndEditVillage_content-input  padding_right-input'>
                <p>Address</p>
                <input type="text" placeholder='Nhập địa chỉ làng' />
            </div>
            
            <div className='createAndEditVillage_content-input'>
                <p>Geocode</p>
                <input type="text" placeholder='Nhập tọa độ địa lí' />
            </div>
            
            <div className='createAndEditVillage_content-history'>
                <p>History</p>
                <textarea type="text" placeholder='Nhập lịch sử làng' />
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
                                <span onClick={() => setSelectedImages(selectedImages.filter(item => item !== img))}><AiOutlineDelete /></span>
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
