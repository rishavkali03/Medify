// HeartForm.jsx
import { useState } from "react";
import axios from "axios";

export default function HeartForm() {
  const [form, setForm] = useState({
    age: "",
    sex: "",
    chest_pain_type: "",
    resting_bp: "",
    cholesterol: "",
    fasting_blood_sugar: "",
    rest_ecg: "",
    max_heart_rate: "",
    exercise_angina: "",
    oldpeak: "",
    slope: "",
    major_vessels: "",
    thal: ""
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/predict/heart", form);
    setPrediction(res.data.prediction);
    console.log(res.data.prediction);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="p-2 border rounded"
            type="number"
            required
          />
        ))}
        <button className="col-span-2 bg-blue-500 text-white p-2 rounded" type="submit">
          Predict
        </button>
      </form>
      {prediction !== null && (
        <div className="mt-4">
          Prediction: <strong>{prediction === 1 ? "Disease" : "No Disease"}</strong>
        </div>
      )}
    </div>
  );
}
