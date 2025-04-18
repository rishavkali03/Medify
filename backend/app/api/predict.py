from fastapi import APIRouter, HTTPException
from app.schemas.disease import HeartInput
from app.schemas.disease import DiabetesInput

import joblib
import numpy as np
import os

router = APIRouter()

base_path = os.path.join(os.path.dirname(__file__), "..", "ml_models")

# Load models and scalers
models = {
    "heart": joblib.load(os.path.join(base_path, "heart_disease_model.pkl")),
    "diabetes": joblib.load(os.path.join(base_path, "diabetes_model_.pkl")),
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
    scaler = scalers[disease]

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

    # Scale and predict
    input_scaled = scaler.transform(input_array)
    prediction = model.predict(input_scaled)[0]

    result = "Positive" if prediction == 1 else "Negative"
    return {"disease": disease, "prediction": result}
