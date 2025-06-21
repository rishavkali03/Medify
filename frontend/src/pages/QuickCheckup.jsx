import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuickCheckup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('heart');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});

  // Heart disease form state
  const [heartForm, setHeartForm] = useState({
    age: '',
    sex: '',
    chest_pain_type: '',
    resting_bp: '',
    cholesterol: '',
    fasting_blood_sugar: '',
    rest_ecg: '',
    max_heart_rate: '',
    exercise_angina: '',
    oldpeak: '',
    slope: '',
    major_vessels: '',
    thal: ''
  });

  // Diabetes form state
  const [diabetesForm, setDiabetesForm] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });

  // Skin disease form state
  const [skinForm, setSkinForm] = useState({
    image: null,
    imagePreview: null
  });

  // Pneumonia form state (upcoming)
  const [pneumoniaForm, setPneumoniaForm] = useState({
    image: null,
    imagePreview: null
  });

  // Cancer form state (upcoming)
  const [cancerForm, setCancerForm] = useState({
    age: '',
    gender: '',
    family_history: '',
    symptoms: '',
    lifestyle_factors: ''
  });

  const handleHeartInputChange = (e) => {
    setHeartForm({
      ...heartForm,
      [e.target.name]: e.target.value
    });
  };

  const handleDiabetesInputChange = (e) => {
    setDiabetesForm({
      ...diabetesForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSkinImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSkinForm({
        ...skinForm,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handlePneumoniaImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPneumoniaForm({
        ...pneumoniaForm,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleCancerInputChange = (e) => {
    setCancerForm({
      ...cancerForm,
      [e.target.name]: e.target.value
    });
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (diseaseType) => {
    setLoading(true);
    try {
      let inputData = {};
      
      if (diseaseType === 'heart') {
        inputData = heartForm;
      } else if (diseaseType === 'diabetes') {
        inputData = diabetesForm;
      } else if (diseaseType === 'skin') {
        if (!skinForm.image) {
          alert('Please select an image for skin disease prediction');
          setLoading(false);
          return;
        }
        const base64Image = await convertImageToBase64(skinForm.image);
        inputData = { image: base64Image };
      } else if (diseaseType === 'pneumonia' || diseaseType === 'cancer') {
        // Show coming soon message for upcoming models
        alert('This feature is coming soon! We are working on integrating this model.');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/predict/${diseaseType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(inputData)
      });

      if (response.ok) {
        const result = await response.json();
        setResults(prev => ({
          ...prev,
          [diseaseType]: result.prediction
        }));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || 'Prediction failed'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Quick Health Checkup
          </h1>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('heart')}
              className={`px-6 py-3 font-medium flex items-center whitespace-nowrap ${
                activeTab === 'heart'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Heart Disease
            </button>
            <button
              onClick={() => setActiveTab('diabetes')}
              className={`px-6 py-3 font-medium flex items-center whitespace-nowrap ${
                activeTab === 'diabetes'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Diabetes
            </button>
            <button
              onClick={() => setActiveTab('skin')}
              className={`px-6 py-3 font-medium flex items-center whitespace-nowrap ${
                activeTab === 'skin'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Skin Disease
            </button>
            <button
              onClick={() => setActiveTab('pneumonia')}
              className={`px-6 py-3 font-medium flex items-center whitespace-nowrap ${
                activeTab === 'pneumonia'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              Pneumonia
            </button>
            <button
              onClick={() => setActiveTab('cancer')}
              className={`px-6 py-3 font-medium flex items-center whitespace-nowrap ${
                activeTab === 'cancer'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              Cancer Risk
            </button>
          </div>

          {/* Heart Disease Form */}
          {activeTab === 'heart' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Heart Disease Prediction</h2>
              <p className="text-gray-600 mb-4">Enter your health metrics to assess heart disease risk.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="age"
                  placeholder="Age (e.g., 55)"
                  value={heartForm.age}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="sex"
                  value={heartForm.sex}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
                <select
                  name="chest_pain_type"
                  value={heartForm.chest_pain_type}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chest Pain Type</option>
                  <option value="0">Typical Angina</option>
                  <option value="1">Atypical Angina</option>
                  <option value="2">Non-anginal Pain</option>
                  <option value="3">Asymptomatic</option>
                </select>
                <input
                  type="number"
                  name="resting_bp"
                  placeholder="Resting BP (e.g., 140 mmHg)"
                  value={heartForm.resting_bp}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="cholesterol"
                  placeholder="Cholesterol (e.g., 240 mg/dl)"
                  value={heartForm.cholesterol}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="fasting_blood_sugar"
                  value={heartForm.fasting_blood_sugar}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Fasting Blood Sugar</option>
                  <option value="1">{'>'} 120 mg/dl</option>
                  <option value="0">≤ 120 mg/dl</option>
                </select>
                <select
                  name="rest_ecg"
                  value={heartForm.rest_ecg}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Resting ECG</option>
                  <option value="0">Normal</option>
                  <option value="1">ST-T Wave Abnormality</option>
                  <option value="2">Left Ventricular Hypertrophy</option>
                </select>
                <input
                  type="number"
                  name="max_heart_rate"
                  placeholder="Max Heart Rate (e.g., 150 bpm)"
                  value={heartForm.max_heart_rate}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="exercise_angina"
                  value={heartForm.exercise_angina}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Exercise Angina</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                <input
                  type="number"
                  name="oldpeak"
                  placeholder="Old Peak (e.g., 2.0)"
                  value={heartForm.oldpeak}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="slope"
                  value={heartForm.slope}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Slope</option>
                  <option value="0">Upsloping</option>
                  <option value="1">Flat</option>
                  <option value="2">Downsloping</option>
                </select>
                <input
                  type="number"
                  name="major_vessels"
                  placeholder="Major Vessels (0-3)"
                  value={heartForm.major_vessels}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="thal"
                  value={heartForm.thal}
                  onChange={handleHeartInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Thalassemia</option>
                  <option value="1">Normal</option>
                  <option value="2">Fixed Defect</option>
                  <option value="3">Reversible Defect</option>
                </select>
              </div>
              <button
                onClick={() => handleSubmit('heart')}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Predicting...' : 'Predict Heart Disease'}
              </button>
              {results.heart && (
                <div className={`p-4 rounded-lg text-center font-semibold ${
                  results.heart === 'Positive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  Prediction: {results.heart}
                </div>
              )}
            </div>
          )}

          {/* Diabetes Form */}
          {activeTab === 'diabetes' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Diabetes Prediction</h2>
              <p className="text-gray-600 mb-4">Enter your health metrics to assess diabetes risk.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="Pregnancies"
                  placeholder="Pregnancies (e.g., 4)"
                  value={diabetesForm.Pregnancies}
                  onChange={handleDiabetesInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="Glucose"
                  placeholder="Glucose (e.g., 150 mg/dl)"
                  value={diabetesForm.Glucose}
                  onChange={handleDiabetesInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="BloodPressure"
                  placeholder="Blood Pressure (e.g., 80 mmHg)"
                  value={diabetesForm.BloodPressure}
                  onChange={handleDiabetesInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="SkinThickness"
                  placeholder="Skin Thickness (e.g., 30 mm)"
                  value={diabetesForm.SkinThickness}
                  onChange={handleDiabetesInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="Insulin"
                  placeholder="Insulin (e.g., 150 mu U/ml)"
                  value={diabetesForm.Insulin}
                  onChange={handleDiabetesInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="BMI"
                  placeholder="BMI (e.g., 35.0)"
                  value={diabetesForm.BMI}
                  onChange={handleDiabetesInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="DiabetesPedigreeFunction"
                  placeholder="Diabetes Pedigree (e.g., 0.5)"
                  value={diabetesForm.DiabetesPedigreeFunction}
                  onChange={handleDiabetesInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="Age"
                  placeholder="Age (e.g., 45)"
                  value={diabetesForm.Age}
                  onChange={handleDiabetesInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleSubmit('diabetes')}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Predicting...' : 'Predict Diabetes'}
              </button>
              {results.diabetes && (
                <div className={`p-4 rounded-lg text-center font-semibold ${
                  results.diabetes === 'Positive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  Prediction: {results.diabetes}
                </div>
              )}
            </div>
          )}

          {/* Skin Disease Form */}
          {activeTab === 'skin' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Skin Disease Prediction</h2>
              <p className="text-gray-600 mb-4">
                Upload an image of the affected skin area. The model can predict: Acne, Melanoma, Peeling skin, Ring worm, and Vitiligo.
              </p>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSkinImageChange}
                    className="hidden"
                    id="skin-image-input"
                  />
                  <label
                    htmlFor="skin-image-input"
                    className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {skinForm.image ? 'Change Image' : 'Choose an image file'}
                  </label>
                  {skinForm.image && (
                    <p className="text-sm text-gray-500 mt-2">
                      Selected: {skinForm.image.name}
                    </p>
                  )}
                </div>
                
                {skinForm.imagePreview && (
                  <div className="text-center">
                    <img
                      src={skinForm.imagePreview}
                      alt="Preview"
                      className="max-w-xs mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleSubmit('skin')}
                disabled={loading || !skinForm.image}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Analyzing Image...' : 'Predict Skin Disease'}
              </button>
              
              {results.skin && (
                <div className="p-4 rounded-lg text-center font-semibold bg-blue-100 text-blue-800">
                  Predicted Skin Disease: {results.skin}
                </div>
              )}
            </div>
          )}

          {/* Pneumonia Form (Upcoming) */}
          {activeTab === 'pneumonia' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                  <p className="text-yellow-800 font-medium">Coming Soon</p>
                </div>
                <p className="text-yellow-700 mt-2">This feature is under development. We're working on integrating a pneumonia detection model using chest X-ray images.</p>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-800">Pneumonia Detection</h2>
              <p className="text-gray-600 mb-4">Upload a chest X-ray image to detect pneumonia. This feature will be available soon.</p>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center opacity-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePneumoniaImageChange}
                    className="hidden"
                    id="pneumonia-image-input"
                    disabled
                  />
                  <label
                    htmlFor="pneumonia-image-input"
                    className="cursor-not-allowed text-gray-400 font-medium"
                  >
                    Choose a chest X-ray image (Coming Soon)
                  </label>
                </div>
                
                {pneumoniaForm.imagePreview && (
                  <div className="text-center">
                    <img
                      src={pneumoniaForm.imagePreview}
                      alt="Preview"
                      className="max-w-xs mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleSubmit('pneumonia')}
                disabled={true}
                className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          )}

          {/* Cancer Risk Form (Upcoming) */}
          {activeTab === 'cancer' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                  <p className="text-yellow-800 font-medium">Coming Soon</p>
                </div>
                <p className="text-yellow-700 mt-2">This feature is under development. We're working on integrating a comprehensive cancer risk assessment model.</p>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-800">Cancer Risk Assessment</h2>
              <p className="text-gray-600 mb-4">Enter your information to assess cancer risk. This feature will be available soon.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-50">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={cancerForm.age}
                  onChange={handleCancerInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
                <select
                  name="gender"
                  value={cancerForm.gender}
                  onChange={handleCancerInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <select
                  name="family_history"
                  value={cancerForm.family_history}
                  onChange={handleCancerInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                >
                  <option value="">Family History</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <textarea
                  name="symptoms"
                  placeholder="Describe any symptoms..."
                  value={cancerForm.symptoms}
                  onChange={handleCancerInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  disabled
                />
                <textarea
                  name="lifestyle_factors"
                  placeholder="Lifestyle factors (smoking, diet, etc.)..."
                  value={cancerForm.lifestyle_factors}
                  onChange={handleCancerInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
                  rows="3"
                  disabled
                />
              </div>
              
              <button
                onClick={() => handleSubmit('cancer')}
                disabled={true}
                className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickCheckup; 