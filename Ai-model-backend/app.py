from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image, UnidentifiedImageError
import io
import logging

app = Flask(__name__)
CORS(app) 

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


try:
    model = tf.keras.models.load_model("skin_disease_model.h5")
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise

CLASS_NAMES = ["ringworm", "rash", "eczema"]

def preprocess_image(image_bytes):
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((256, 256))
        img_array = np.array(img) / 255.0
        return np.expand_dims(img_array, axis=0)
    except UnidentifiedImageError:
        raise ValueError("Invalid image file")
    except Exception as e:
        raise ValueError(f"Image processing error: {str(e)}")

@app.route('/predict', methods=['POST'])
def predict():
    logger.info("Predict endpoint hit")
    
    if 'file' not in request.files:
        logger.warning("No file in request")
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    
    if file.filename == '':
        logger.warning("Empty filename")
        return jsonify({"error": "No selected file"}), 400

    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        logger.warning(f"Invalid file type: {file.filename}")
        return jsonify({"error": "Only PNG, JPG, and JPEG files are allowed"}), 400

    try:
        logger.info(f"Processing file: {file.filename}")
        image_bytes = file.read()
        
        if len(image_bytes) == 0:
            logger.warning("Empty file received")
            return jsonify({"error": "Empty file"}), 400

        processed = preprocess_image(image_bytes)
        prediction = model.predict(processed)
        class_idx = int(np.argmax(prediction))
        confidence = float(np.max(prediction))

        result = {
            "prediction": CLASS_NAMES[class_idx],
            "confidence": round(confidence * 100, 2)
        }
        
        logger.info(f"Prediction successful: {result}")
        return jsonify(result)

    except ValueError as e:
        logger.error(f"ValueError: {str(e)}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)