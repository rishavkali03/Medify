from fastapi import APIRouter, HTTPException, UploadFile, File
from app.schemas.disease import HeartInput
from app.schemas.disease import DiabetesInput
from app.schemas.disease import SkinDiseaseInput

import joblib
import numpy as np
import os
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import base64
import io
from PIL import Image

router = APIRouter()

base_path = os.path.join(os.path.dirname(__file__), "..", "ml_models")

# Load models and scalers
models = {
    "heart": joblib.load(os.path.join(base_path, "heart_disease_model.pkl")),
    "diabetes": joblib.load(os.path.join(base_path, "diabetes_model_.pkl")),
    "skin": tf.keras.models.load_model(os.path.join(base_path, "skindisease.h5")),
}

scalers = {
    "heart": joblib.load(os.path.join(base_path, "heart_scaler.pkl")),
    "diabetes": joblib.load(os.path.join(base_path, "scaler.pkl")),
}

@router.post("/predict/{disease}")
def predict_disease(disease: str, input_data: dict):
    if disease not in models:
        raise HTTPException(status_code=404, detail="Model not found for this disease.")

    model = models[disease]

    if disease == "heart":
        try:
            data_obj = HeartInput(**input_data)
        except:
            raise HTTPException(status_code=422, detail="Invalid input for heart disease")
        input_array = np.array([[
            data_obj.age, data_obj.sex, data_obj.chest_pain_type,
            data_obj.resting_bp, data_obj.cholesterol, data_obj.fasting_blood_sugar,
            data_obj.rest_ecg, data_obj.max_heart_rate, data_obj.exercise_angina,
            data_obj.oldpeak, data_obj.slope, data_obj.major_vessels,
            data_obj.thal
        ]])
        scaler = scalers[disease]
        input_scaled = scaler.transform(input_array)
        prediction = model.predict(input_scaled)[0]
        result = "Positive" if prediction == 1 else "Negative"

    elif disease == "diabetes":
        try:
            data_obj = DiabetesInput(**input_data)
        except:
            raise HTTPException(status_code=422, detail="Invalid input for diabetes")
        input_array = np.array([[ 
            data_obj.Pregnancies, data_obj.Glucose, data_obj.BloodPressure,
            data_obj.SkinThickness, data_obj.Insulin, data_obj.BMI,
            data_obj.DiabetesPedigreeFunction, data_obj.Age
        ]])
        scaler = scalers[disease]
        input_scaled = scaler.transform(input_array)
        prediction = model.predict(input_scaled)[0]
        result = "Positive" if prediction == 1 else "Negative"

    elif disease == "skin":
        try:
            # Handle image-based prediction like the original Flask app
            if 'image' not in input_data:
                raise HTTPException(status_code=422, detail="Image is required for skin disease prediction")
            
            # Decode base64 image
            image_data = input_data['image']
            if image_data.startswith('data:image'):
                image_data = image_data.split(',')[1]
            
            image_bytes = base64.b64decode(image_data)
            img = Image.open(io.BytesIO(image_bytes))
            
            # Preprocess image exactly like the original Flask app
            img = img.resize((64, 64))
            x = image.img_to_array(img)
            x = np.expand_dims(x, axis=0)
            
            # Make prediction
            preds = model.predict(x)
            index = ['Acne', 'Melanoma', 'Peeling skin', 'Ring worm', 'Vitiligo']
            label = np.argmax(preds, axis=1)[0]
            result = index[label]
            
        except Exception as e:
            raise HTTPException(status_code=422, detail=f"Invalid input for skin disease: {str(e)}")

    return {"disease": disease, "prediction": result}

@router.post("/predict/skin/upload")
async def predict_skin_disease_upload(file: UploadFile = File(...)):
    """Alternative endpoint for direct file upload"""
    try:
        # Read and preprocess the uploaded image
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))
        
        # Preprocess image exactly like the original Flask app
        img = img.resize((64, 64))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        
        # Make prediction
        model = models["skin"]
        preds = model.predict(x)
        index = ['Acne', 'Melanoma', 'Peeling skin', 'Ring worm', 'Vitiligo']
        label = np.argmax(preds, axis=1)[0]
        result = index[label]
        
        return {"disease": "skin", "prediction": result}
        
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Error processing image: {str(e)}")
