import load from '../assets/images/load.png';
import { useRef, useState } from 'react';

const DashboardDiagnose = () => {

const inputRef = useRef(null);
const [image, SetImage] = useState("");

const handleImageClick = () => {
    inputRef.current.click();
};

const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    SetImage(event.target.files[0]);

};

    return (
        <div id="DashboardText-container">
        <div className="text-title"><h1>Upload Your Photo</h1></div>
        
        <div className="image-upload-container">
        <div className='box-decoration'>
        <label htmlFor="image-upload-input" className='image-upload-label'>
            {image ? image.name : "Click to upload an image"}
        </label>
        <div onClick={handleImageClick}>
        {image ? <img src={URL.createObjectURL(image)} alt="" className='img-display-after'/>: 
        <img src={load} alt=""  className='img-display-before'/>}
        <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:"none"}}/>
        </div>
        <button className='image-upload-button'>Process</button>
        </div>
        </div>

        </div>
    );
};

export default DashboardDiagnose;