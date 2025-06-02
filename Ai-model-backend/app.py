from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io


app = Flask(__name__)
CORS(app) 


model = tf.keras.models.load_model("skin_disease_model.h5")
CLASS_NAMES = ["eczema", "rash", "ringworm"]


def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((256, 256))
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image = request.files['file'].read()
    processed = preprocess_image(image)
    prediction = model.predict(processed)
    class_idx = int(np.argmax(prediction))
    confidence = float(np.max(prediction))

    return jsonify({
        "prediction": CLASS_NAMES[class_idx],
        "confidence": round(confidence * 100, 2)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
