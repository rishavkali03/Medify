from pydantic import BaseModel
from typing import Optional

class HeartInput(BaseModel):
    age: float
    sex: float
    chest_pain_type: float
    resting_bp: float
    cholesterol: float
    fasting_blood_sugar: float
    rest_ecg: float
    max_heart_rate: float
    exercise_angina: float
    oldpeak: float
    slope: float
    major_vessels: float
    thal: float


class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int


class SkinDiseaseInput(BaseModel):
    # For image-based skin disease prediction
    image: Optional[str] = None  # Base64 encoded image or file path
