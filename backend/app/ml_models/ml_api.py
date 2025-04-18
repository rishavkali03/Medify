{
    # from fastapi import FastAPI
# from pydantic import BaseModel
# import numpy as np
# import pickle
# import os

# # Load model and scaler with absolute paths
# base_dir = os.path.dirname(os.path.abspath(__file__))

# model_path = os.path.join(base_dir, "diabetes_model_.pkl")
# scaler_path = os.path.join(base_dir, "scaler.pkl")

# try:
#     with open(model_path, "rb") as model_file:
#         classifier = pickle.load(model_file)

#     with open(scaler_path, "rb") as scaler_file:
#         scaler = pickle.load(scaler_file)

# except FileNotFoundError as e:
#     raise RuntimeError(
#         "Model or scaler file not found. Make sure diabetes_model_.pkl and scaler.pkl are in the correct path."
#     ) from e

# # Create FastAPI app
# app = FastAPI()

# # Define input data model
# class DiabetesInput(BaseModel):
#     Pregnancies: int
#     Glucose: int
#     BloodPressure: int
#     SkinThickness: int
#     Insulin: int
#     BMI: float
#     DiabetesPedigreeFunction: float
#     Age: int

# # Define prediction route
# @app.post("/predict")
# def predict_diabetes(data: DiabetesInput):
#     input_data = np.array([[
#         data.Pregnancies,
#         data.Glucose,
#         data.BloodPressure,
#         data.SkinThickness,
#         data.Insulin,
#         data.BMI,
#         data.DiabetesPedigreeFunction,
#         data.Age
#     ]])

#     # Scale the input
#     input_scaled = scaler.transform(input_data)

#     # Make prediction
#     prediction = classifier.predict(input_scaled)

#     result = "Diabetic" if prediction[0] == 1 else "Not Diabetic"
#     return {"prediction": result}


}