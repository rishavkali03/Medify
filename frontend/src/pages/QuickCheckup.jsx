import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const additionalSkinDiseases = [
  'Melanoma', 'Eczema', 'Psoriasis', 'Acne', 'Rosacea', 'Vitiligo', 'Warts',
  'Basal Cell Carcinoma', 'Squamous Cell Carcinoma', 'Lupus', 'Contact Dermatitis',
  'Seborrheic Dermatitis', 'Actinic Keratosis', 'Cellulitis', 'Shingles', 'Boils',
  'Hives', 'Fungal Infections', 'Scabies', 'Molluscum Contagiosum', 'Ringworm',
  'Impetigo', 'Cold Sores', 'Hyperpigmentation', 'Keratosis Pilaris',
  'Cutaneous T-cell Lymphoma', 'Dermatofibroma', 'Epidermoid Cyst', 'Lichen Planus',
  'Melasma', 'Perioral Dermatitis', 'Pityriasis Rosea', 'Tinea Versicolor',
  'Xerosis', 'Necrobiosis Lipoidica', 'Pemphigus Vulgaris', 'Alopecia Areata',
  'Chloasma', 'Folliculitis', 'Ichthyosis Vulgaris', 'Keloids',
  'Neurodermatitis', 'Poikiloderma', 'Prurigo Nodularis', 'Rhinophyma', 'Telangiectasia',
  'Dermatomyositis', 'Angioma', 'Urticaria', 'Skin Tags'
];

const diseases = [
  {
    id: 'skin-cancer',
    name: 'Skin Cancer Detection',
    description: 'Upload an image of a skin lesion for analysis',
    inputType: 'image',
    available: false,
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia Detection',
    description: 'Upload a chest X-ray image for analysis',
    inputType: 'image',
    available: false,
  },
  {
    id: 'diabetes',
    name: 'Diabetes Risk Assessment',
    description: 'Enter your health metrics for risk assessment',
    inputType: 'form',
    available: true,
  },
  {
    id: 'heart-disease',
    name: 'Heart Disease Risk Assessment',
    description: 'Enter your health metrics for risk assessment',
    inputType: 'form',
    available: true,
  },
  ...additionalSkinDiseases.map((name) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    description: 'Upload an image for analysis',
    inputType: 'image',
    available: false,
  })),
];

export default function QuickCheckup() {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const handleDiseaseSelect = (disease) => {
    if (disease.available) {
      setSelectedDisease(disease);
      setResult(null);
      setFormData({});
      setImage(null);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      const value = formData[key];
      if (isNaN(value) || value < 0) {
        alert("Please enter valid, non-negative values.");
        return;
      }
    }

    try {
      // Special handling for heart disease assessment
      if (selectedDisease.id === 'heart-disease') {
        const response = await axios.post(`${BASE_URL}/api/predict/heart`, formData)
        const prediction = response.data.prediction;
        
        setResult({
          heartDisease: prediction === 1 ? 'Yes' : 'No',
          prediction: prediction,
          ...formData
        });
        return;
      }
      
      // Special handling for diabetes assessment - now using API endpoint
      if (selectedDisease.id === 'diabetes') {
        const response = await axios.post(`${BASE_URL}/api/predict/diabetes`, formData);
        const prediction = response.data.prediction;
        
        setResult({
          diabetes: prediction === 1 ? 'Yes' : 'No',
          prediction: prediction,
          ...formData
        });
        return;
      }

      // For other disease types
      const formDataToSend = new FormData();
      if (selectedDisease.inputType === 'image') {
        if (!image) return alert("Please upload an image.");
        formDataToSend.append('image', image);
      } else {
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });
      }

      const response = await fetch(`${BASE_URL}/api/diseases/${selectedDisease.id}/predict`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        throw new Error('Prediction failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Something went wrong. Please try again.");
    }
  };

  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'available' && disease.available) ||
      (filter === 'upcoming' && !disease.available);
    return matchesSearch && matchesFilter;
  });

  const getStatusDot = (available) => (
    <span
      className={`w-3 h-3 inline-block rounded-full mr-2 animate-pulse ${available ? 'bg-green-500' : 'bg-yellow-400'}`}
      title={available ? 'Available' : 'Upcoming'}
    ></span>
  );

  const renderResultMessage = () => {
    if (!result) return null;

    if (selectedDisease.id === 'diabetes') {
      if (result.diabetes === 'Yes') {
        return <p className="text-red-600 font-semibold">Yes, you are at high risk for diabetes. Please consult our doctors for advice immediately.</p>;
      } else {
        return <p className="text-green-600 font-semibold">Don't worry, your diabetes risk appears to be low 😊</p>;
      }
    }

    if (selectedDisease.id === 'heart-disease') {
      if (result.heartDisease === 'Yes') {
        return <p className="text-red-600 font-semibold">You are at high risk for heart disease. Please consult a cardiologist for professional advice.</p>;
      } else {
        return <p className="text-green-600 font-semibold">Your heart disease risk appears to be low. Keep maintaining a healthy lifestyle! 😊</p>;
      }
    }

    return null;
  };

  // Placeholder data for diabetes form inputs
  const diabetesPlaceholders = {
    pregnancies: "4-9 (Typical diabetic value)",
    glucose: "130-200+ mg/dL (Typical diabetic value)",
    blood_pressure: "70-90 mm Hg (Typical diabetic value)",
    skin_thickness: "20-40 mm (Typical diabetic value)",
    insulin: "100-300 mu U/ml (Typical diabetic value)",
    bmi: "30-45 kg/m² (Typical diabetic value)",
    diabetes_pedigree_function: "0.5-2.5 (Typical diabetic value)",
    age: "35-60+ years (Typical diabetic value)"
  };

  // Placeholder data for heart disease form inputs
  const heartDiseasePlaceholders = {
    age: "55+ (Higher risk)",
    sex: "0 = female, 1 = male (Males have higher risk)",
    chest_pain_type: "0-3 (0: typical angina, 1: atypical angina, 2: non-anginal pain, 3: asymptomatic)",
    resting_bp: "140+ mm Hg (Higher risk)",
    cholesterol: "240+ mg/dl (Higher risk)",
    fasting_blood_sugar: "0 = <120 mg/dl, 1 = >120 mg/dl",
    rest_ecg: "0: normal, 1: ST-T wave abnormality, 2: left ventricular hypertrophy",
    max_heart_rate: "100-170 (Lower is higher risk)",
    exercise_angina: "0 = no, 1 = yes (Yes indicates higher risk)",
    oldpeak: "ST depression induced by exercise (>2 is higher risk)",
    slope: "0 = upsloping, 1 = flat, 2 = downsloping (Higher values indicate higher risk)",
    major_vessels: "0-3 (Number of major vessels, more vessels = higher risk)",
    thal: "0 = normal, 1 = fixed defect, 2 = reversible defect"
  };

  // Get form fields based on selected disease
  const getFormFields = () => {
    if (selectedDisease.id === 'diabetes') {
      return [
        ['pregnancies', 'Pregnancies'],
        ['glucose', 'Glucose'],
        ['blood_pressure', 'Blood Pressure'],
        ['skin_thickness', 'Skin Thickness'],
        ['insulin', 'Insulin'],
        ['bmi', 'BMI'],
        ['diabetes_pedigree_function', 'Diabetes Pedigree Function'],
        ['age', 'Age']
      ];
    } else if (selectedDisease.id === 'heart-disease') {
      return [
        ['age', 'Age'],
        ['sex', 'Sex'],
        ['chest_pain_type', 'Chest Pain Type'],
        ['resting_bp', 'Resting Blood Pressure'],
        ['cholesterol', 'Serum Cholesterol'],
        ['fasting_blood_sugar', 'Fasting Blood Sugar > 120 mg/dl'],
        ['rest_ecg', 'Resting Electrocardiographic Results'],
        ['max_heart_rate', 'Maximum Heart Rate Achieved'],
        ['exercise_angina', 'Exercise Induced Angina'],
        ['oldpeak', 'ST Depression Induced by Exercise'],
        ['slope', 'Slope of Peak Exercise ST Segment'],
        ['major_vessels', 'Number of Major Vessels'],
        ['thal', 'Thal']
      ];
    }
    return [];
  };

  // Get placeholder based on selected disease and field
  const getPlaceholder = (key) => {
    if (selectedDisease.id === 'diabetes') {
      return diabetesPlaceholders[key];
    } else if (selectedDisease.id === 'heart-disease') {
      return heartDiseasePlaceholders[key];
    }
    return '';
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-white via-blue-150 to-blue-300 min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-6 text-center text-blue-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Quick Health Checkup
      </motion.h1>

      {!selectedDisease && (
        <motion.div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search disease..."
                className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-2 md:mt-0 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </motion.div>
      )}

      {!selectedDisease ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03 } },
          }}
        >
          {filteredDiseases.map((disease) => (
            <motion.div
              key={disease.id}
              className={`bg-gradient-to-br from-white via-blue-50 to-white p-5 rounded-xl shadow transition border cursor-pointer ${disease.available ? 'hover:shadow-lg border-blue-100 hover:border-blue-300' : 'opacity-60 cursor-not-allowed'}`}
              onClick={() => handleDiseaseSelect(disease)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: disease.available ? 1.03 : 1 }}
              whileTap={{ scale: disease.available ? 0.97 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-blue-800 mb-1">
                {getStatusDot(disease.available)}{disease.name}
              </h2>
              <p className="text-gray-600 text-sm">{disease.description}</p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDisease.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">{selectedDisease.name}</h2>

              {result ? (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold mb-2">Results</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800">{JSON.stringify(result, null, 2)}</pre>
                    <div className="mt-4">{renderResultMessage()}</div>
                  </div>
                  <motion.button
                    onClick={() => setSelectedDisease(null)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back to Diseases
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {selectedDisease.inputType === 'image' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getFormFields().map(([key, label]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700">{label}</label>
                          <input
                            type="number"
                            name={key}
                            onChange={handleFormChange}
                            placeholder={getPlaceholder(key)}
                            className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            style={{ borderWidth: '1px' }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() => setSelectedDisease(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Analyze
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}