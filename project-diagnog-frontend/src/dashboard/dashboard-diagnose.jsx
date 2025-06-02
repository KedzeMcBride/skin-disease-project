import load from '../assets/images/load.png';
import { useRef, useState } from 'react';

const DashboardDiagnose = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        console.log("Selected file:", file.name, file.size);
        setImage(file);
        setPrediction(null);
        setError(null);
    };

    const handleProcess = async () => {
        if (!image) {
            setError("Please upload an image first");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('file', image);

        try {
            console.log("Sending request to backend...");
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();
            console.log("Backend response:", responseData);

            if (!response.ok) {
                throw new Error(responseData.error || `Request failed with status ${response.status}`);
            }

            setPrediction(responseData);
        } catch (error) {
            console.error("API Error:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
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
                        {image ? <img src={URL.createObjectURL(image)} alt="Upload preview" className='img-display-after'/> : 
                        <img src={load} alt="Placeholder" className='img-display-before'/>}
                        <input 
                            type="file" 
                            ref={inputRef} 
                            onChange={handleImageChange} 
                            style={{display:"none"}} 
                            accept='image/*' 
                            capture="user"
                            id="image-upload-input"
                        />
                    </div>
                    <button 
                        className='image-upload-button' 
                        onClick={handleProcess}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Process'}
                    </button>
                    
                    {error && (
                        <div className="error-message" style={{color: 'red', marginTop: '10px'}}>
                            Error: {error}
                        </div>
                    )}
                    
                    {prediction && (
                        <div className="prediction-result" style={{marginTop: '20px'}}>
                            <h3>Prediction: {prediction.prediction}</h3>
                            <p>Confidence: {prediction.confidence}%</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardDiagnose;